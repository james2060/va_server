var express = require('express');
var router = express.Router();

const cve_controller = require("../controller/cve_controller")
const user_controller = require("../controller/user_controller")
const content_controller = require("../controller/content_controller")


router.get('/', user_controller.statusAPI)
router.get('/message', user_controller.messageAPI)
router.post('/post', user_controller.postAPI)
router.post('/cveSearchAPI', cve_controller.cveSearchAPI)
router.post('/cveSearchProduct', cve_controller.cveSearchProduct)
//router.post('/cvedbUpdate', content_controller.cvedb_update)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
