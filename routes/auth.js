var express = require('express');
var router = express.Router();

const verifySignUp = require("../middlewares/verifySignUp");
const controller = require("../controller/auth_controller");
const winston = require('../helper/logger');


const db = require("../db/models");
const dbConfig = require("../config/db.config")
const Role = db.role;

db.mongoose
  .connect(/*`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbnameß}`*/dbConfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post(
    "/api/auth/signup",
    [
      verifySignUp.checkRolesExisted, 
      verifySignUp.checkDuplicateUsernameOrEmail
      
    ],
    controller.signup
  );

router.post("/api/auth/signin", controller.signin);
/*
module.exports = function(app) {
  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  router.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  router.post("/api/auth/signin", controller.signin);
};
*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          winston.error(err);
          console.log("error", err);
        }
        winston.info("added 'user' to roles collection");
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
