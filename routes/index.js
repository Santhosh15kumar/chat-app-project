const userController = require('../controllers/user.js');
const dataController = require('../controllers/data.js');

const router = require('express').Router();

router.post('/api/bhanu', userController.create);
router.post('/api/clientdatagetbyid',dataController.getUserData);
router.post('/api/bhanuforonline',dataController.online);

module.exports = router;

