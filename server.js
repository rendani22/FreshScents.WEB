const config = require('./config'),
    express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    moment = require("moment"),
    expressHandlebars = require('express-handlebars'),
    cookieParser = require('cookie-parser') ;

    const productRoutes = require('./routes/productRoutes')
          userRoutes = require('./routes/userRoutes'),
          storeRoutes = require('./routes/storeRoutes'),
          {requireAuth} = require('./middleware/authMiddleware');

    const app = express();

    app.use(cookieParser());

    const connection = mongoose.connect(config.database, { useNewUrlParser: true }, (err) => {
        if(err){console.log(err)}
        else{console.info("MongoDb: Connection successfully")}
    });


    const title = "Fresh Scent";
    

    // hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
    

    app.set('views', path.join(__dirname,'/views'));
    app.engine('hbs', expressHandlebars({
        extname: 'hbs',
        defaultLayout:'mainLayout',
        layoutsDir:__dirname + '/views',
        helpers: {
            formatDate: function (date) {
                if (!date) {return null}
                return moment(date).format("D/M/Y");
            },
            display: (displayStatus) => {
                if(displayStatus) return "Yes";
                return "No";
            },
            popular: (popularStatus) => {
                if(popularStatus) return "On Fire";
                return "Cold";
            },
            status: (status) => {
                if(status) return "Available";
                return "Unavailable";
            }
        }
    }))

    app.set('view engine', 'hbs');

    app.use(express.static(__dirname + '/views'));

    app.listen(config.port, () =>{
        console.log(`Listing on port:` + config.port);
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(userRoutes,storeRoutes)
    app.use('/', requireAuth, productRoutes);




