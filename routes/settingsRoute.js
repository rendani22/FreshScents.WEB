const Router = require('express'),
      settingController = require('../controller/settingsController');

      const router = Router();

      router.post('/setting',settingController.createSetting )
      router.post('/changeSetting',settingController.changeSetting);


      
module.exports = router;