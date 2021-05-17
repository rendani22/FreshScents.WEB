const e = require("express");

const environment = process.env.NODE_ENV || 'production';

console.log(`the environment is ${environment}`)

if(environment == 'production'){
    module.exports = {
        'port'		: process.env.PORT || 8080,
        'database'	: 'mongodb+srv://fresh:6PEACRTHaYZiHv9@cluster0.x5wth.mongodb.net/FreshScents?retryWrites=true&w=majority'
     };
    }else{
        module.exports = {
            'port'		: process.env.PORT || 8080,
            'database'	: 'mongodb+srv://fresh:6PEACRTHaYZiHv9@cluster0.x5wth.mongodb.net/FreshScents_dev?retryWrites=true&w=majority'
         };
    }

