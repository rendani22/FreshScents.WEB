const Router = require('express'),
      productController = require('../controller/productController');
const multer = require('multer');

const router = Router();
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'uploads')
   },
filename: (req, file, cb) => {
cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });


router.post('/createProduct',upload.single('file'),productController.createProduct);


router.get('/products', productController.findAllProducts);

router.get('/dashboard',productController.dashboard);
router.get('/user', productController.profile)

router.get('/addProduct', productController.addProduct);
router.patch('/update/:id',productController.updateProduct);

module.exports = router;

