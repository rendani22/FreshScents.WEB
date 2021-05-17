const Router = require('express'),
      userController = require('../controller/userController');

const router = Router();

router.post('/user', userController.createUser);
router.post('/userAccess', userController.grantAccess);
router.get('/login', userController.loginView);
router.get('/logout', userController.logout);



module.exports = router;