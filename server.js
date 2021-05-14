const config = require('./config'),
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

const app = express(),
    apiRouter = express.Router(),
    connection = mongoose.connect(config.database, { useNewUrlParser: true }),
    product = require('./models/product');

      app.use(bodyParser.json({limit: '10mb'}));

      app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

      app.use(function(req, res, next)
        {
        /* Allow access from any requesting client */
        res.setHeader('Access-Control-Allow-Origin', '*');

        /* Allow access for any of the following Http request types */
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

        /* Set the Http request header */
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
            next();
        });



        apiRouter.get('/product', (req,res) => {
            product.find({display: true}, (err, recs) => {
                if(err) res.json({
                    message: err.message,
                    success: false
                })

                res.json({
                    message: "OK",
                    success: true,
                    result: recs
                });
            });
        });

        // Insert products into the products collection
        apiRouter.post('/product', (req,res) =>{

            product.create({
                productName : req.body.productName,
                description : req.body.description,
                status : req.body.status,
                gender : req.body.gender,
                popular : req.body.popular,
                addedBy :  req.body.addedBy

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


      app.use('/api', apiRouter);
      app.listen(config.port);
