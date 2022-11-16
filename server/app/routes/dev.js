const controller = require('../controllers/dev');
const router = require('express').Router();

router.get('/dev', controller.version);

module.exports = router;
