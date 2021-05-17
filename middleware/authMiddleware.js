const jwt = require('jsonwebtoken'),
      mongoose = require('mongoose'),
      settingsSchema = require('../models/settings');;

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 's1QKQGTKpKA860Adl1GPvljMr2ddfg7nuryVQMjGsMs=', (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}

const userName = async (req,res,next) => {
    const username = req.cookies.username;
    const settingDetails = await settingsSchema.findOne().exec();

    if(username){
        res.locals.sideBarColor = settingDetails.sideBarColor;
        res.locals.sideBarImage = settingDetails.sideBarImage;
        res.locals.siteName = settingDetails.siteName;
        
        res.locals.username = username;
        next();
    }else{
        next();
    }

}

const siteSettings =async (req,res,next) => {
    const settingDetails = await settingsSchema.findOne().exec();
    console.log(settingDetails)
    res.locals.settingDetails = settingDetails;
    next();
}

module.exports = {requireAuth,userName,siteSettings};