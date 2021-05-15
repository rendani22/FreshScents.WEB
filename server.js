const config = require('./config'),
    express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    expressHandlebars = require('express-handlebars');
    const productController = require('./controller/productController');


    const app = express();

 



    const connection = mongoose.connect(config.database, { useNewUrlParser: true }, (err) => {
        if(err){console.log(err)}
        else{console.info("MongoDb: Connection successfully")}
    });


    // app.engine('hbs', engines.handlebars);
    // app.set('views', './views');


    app.set('views', path.join(__dirname,'/views'));
    app.engine('hbs', expressHandlebars({
        extname: 'hbs',
        defaultLayout:'mainLayout',
        layoutsDir:__dirname + '/views'
    }))

    app.set('view engine', 'hbs');

    app.use(express.static(__dirname + '/views'));


    app.listen(config.port, () =>{
        console.log(`Listing on port:` + config.port);
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', productController);




