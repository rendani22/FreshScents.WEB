const Router = require('express'),
      productController = require('../controller/productController'),
      userController = require('../controller/userController');

      const router = Router();

      router.get('/',productController.findDisplayProducts);

      module.exports = router;