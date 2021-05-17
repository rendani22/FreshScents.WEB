const mongoose = require('mongoose');
     var fs = require('fs');
     var imgModel = require('../models/productImage'),
         userSchema = require('../models/user');

    module.exports.createProduct = (req, res, next) => {
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
              res.redirect('/addProduct');
          }
      });
  };

  module.exports.findDisplayProducts = (req,res) => {
    imgModel.find({display: true}).lean().exec((err, recs) => {
        if(err) res.json({
            message: err.message,
            success: false
        })
        res.render('productList', {
            products : recs,
            viewTitle: "Fresh Scents",
            whatsappMessage: "hi,\nI hope you are well.\nI would like to order"});
    });
};

    // Admin page for list of products
    module.exports.findAllProducts = (req,res) => {
        imgModel.find().lean().exec((err, recs) => {
            if(err) res.json({
                message: err.message,
                success: false
            })
            res.render('./dashboardViews/productsView', {
                products : recs,
                layout: './layout/dashboardLayout',
                section: "Products",
                subtitle: "List of products that have been added",
                viewTitle: "Fresh Scents"});
        });
    };

    module.exports.dashboard = (req,res) =>{
        res.render('./dashboardViews/dashboardView',{
            layout: './layout/dashboardLayout',
            section: "Dashboard",
            subtitle: "Insight to what is happing"
        })
    };

    module.exports.addProduct = (req,res) =>{
        res.render('./dashboardViews/addProductView',{
            layout: './layout/dashboardLayout',
            section: "New Product",
            subtitle: "Add new product to list"
        });
    };

    module.exports.profile = async (req,res) =>{
        const username = req.cookies.username;
        await userSchema.findOne({username}).lean().exec((err, recs) => {
                res.render('./dashboardViews/profileView',{
                    layout: './layout/dashboardLayout',
                    user: recs
                });
        });
    }

    // Update product info
   module.exports.updateProduct = async (req, res) => {
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
    };