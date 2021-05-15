const express = require('express'),
    mongoose = require('mongoose');
    product = require('../models/product'),
     products = mongoose.model('product'),
     apiRouter = express.Router();
     var fs = require('fs');
     var path = require('path');
     var imgModel = require('../models/productImage');
     var multer = require('multer');
 
     var storage = multer.diskStorage({
         destination: (req, file, cb) => {
         cb(null, 'uploads')
        },
     filename: (req, file, cb) => {
     cb(null, file.originalname)
         }
     });
     var upload = multer({ storage: storage });

     apiRouter.post('/', upload.single('file'), (req, res, next) => {
          /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
        var tmp_path = req.file.path;

        let img = fs.readFileSync(tmp_path);
        let encodedImage = img.toString('base64');
        var obj = {
            productName : req.body.productName,
            description : req.body.description,
            status : req.body.status,
            gender : req.body.gender,
            popular : req.body.popular,
            addedBy :  "Admin",
            price : req.body.price,
            img: {
                data: encodedImage,
                contentType: req.file.mimetype
            }
        }
        imgModel.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                // item.save();
                res.redirect('/admin');
            }
        });
    });

    apiRouter.get('/', (req,res) => {
        imgModel.find({display: true}).lean().exec((err, recs) => {
            if(err) res.json({
                message: err.message,
                success: false
            })
            res.render('productList', {
                products : recs,
                viewTitle: "Fresh Scents"});
        });
    });

    // Admin page for list of products
    apiRouter.get('/admin', (req,res) => {
        imgModel.find().lean().exec((err, recs) => {
            if(err) res.json({
                message: err.message,
                success: false
            })
            res.render('admin', {
                products : recs,
                section: "Products",
                viewTitle: "Fresh Scents"});
        });
    });

    // Update product info
    apiRouter.patch("/update/:id", async  (req, res) => {
        try {
            const product = await imgModel.findById(req.params.id ).exec();
            if(product){
            if ("productName" in req.body) {
                product.productName = req.body.productName;
            }
            if ("price" in req.body) {
                product.price = req.body.price.replace('R', '');
            }
            if ("status" in req.body) {
                product.status = req.body.status
            }
            if ("gender" in req.body) {
                product.gender = req.body.gender
            }
            if ("display" in req.body) {
                product.display = req.body.display
            }
            if ("description" in req.body) {
                product.description = req.body.description
            }
            if ("popular" in req.body) {
                product.popular = req.body.popular
            }
            //Update product system info
            product.lastModified = Date.now();
            product.__v += 1;
    
            await product.save((err,smal) =>{
                if(err) {
                    res.json({
                        success: false,
                        message: err
                    });
                }else{
                    res.json({
                        success: true,
                        message: "Product updated successfully"
                    });
                }
            });
            }

         } catch {

            res.json({
                success: false,
                message: "Product not found"
            });
        }
    });

// Insert products into the products collection
apiRouter.post('/product', (req,res) =>{
    console.log(req.body)

    products.create({
        productName : req.body.productName,
        description : req.body.description,
        status : req.body.status,
        gender : req.body.gender,
        popular : req.body.popular,
        addedBy :  "Admin",
        price : req.body.price

    }, (err,small) =>{
        if(err) {
            res.json({
            message: err.message,
            success: false,
            result: req.body
        });
    } else{
        res.json({
            message: `'${req.body.productName} saved successfully'`,
            success : true,
            result : small
        });
    }
    });
});

function insertRecord(req,res){

}

module.exports = apiRouter;