var express = require('express');
var router = express.Router();

const authJwt = require("../middlewares/authJwt");
const controller = require("../controller/content_controller");


router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.get("/api/update/cvedb", [authJwt.verifyToken], controller.cvedb_update);
/*
router.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
router.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
);

router.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
);
*/
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  
module.exports = router;
  
  