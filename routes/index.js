const userController = require('../controllers/user.js');
const dataController = require('../controllers/data.js');
const agentController = require('../controllers/agent.js');

const router = require('express').Router();

router.post('/api/bhanu', userController.create);
router.post('/api/clientdatagetbyid',dataController.getUserData);
router.post('/api/bhanuforonline',dataController.online);
router.post('/api/agentlogindata',agentController.agentLogin);
router.post('/api/singleageclidata',userController.getuserById);
router.post('/api/clientarrayupdate/:email',userController.updateUserDetails);


module.exports = router;

