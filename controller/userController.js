const userSchema = require('../models/user'),
      jwt = require('jsonwebtoken');

//Save user data
     module.exports.createUser = async (req,res) =>{
         console.log("hits");
        var userObject = {
            username: req.body.username.toLowerCase(),
            firstName: req.body.firstName,
            emailAddress: req.body.emailAddress,
            lastName: req.body.lastName,
            password: req.body.password,
            createdBy: req.body.createdBy,
            dob: req.body.dob
        }

        await userSchema.create(userObject, (err, item) => {
            if(err){
                handleErrors(err);
                res.json({
                    item: item,
                    message: err
                });    
            }
            else{
                res.json({
                    item: item,
                    message: "Saved"
                });
            }
        });
     };


    //  Get User by username
   module.exports.grantAccess = async (req,res) =>{
       const {username, password} = req.body;
 
       try{
           const user = await userSchema.login(username, password);
           const token = createToken(user._id);
           res.cookie('jwt',token,{ httpOnly: true, maxAge: _maxAge * 1000});
           res.cookie('username', user.username,{ httpOnly: true, maxAge: _maxAge * 1000});
           res.status(201).json({
               message: "Access granted",
               grantAccess: user.grantAccess
           });
       } catch(err){
        const error = handleErrors(err);
           res.status(400).json({
               message: error,
               grantAccess: false
           });
       }
    };


    module.exports.loginView = (req,res) =>{
        res.render('./loginView',{
            layout: false
        });
    };

    module.exports.logout = (req,res) =>{
        res.cookie('jwt','',{maxAge: 1});
        res.cookie('username','',{maxAge: 1});
        res.redirect('/');
    };



    const handleErrors = (err) => {
        console.log(err.message, err.code);
        let error = err.message;
    }

    const createToken = (id) => {
        return jwt.sign({ id }, 's1QKQGTKpKA860Adl1GPvljMr2ddfg7nuryVQMjGsMs=',{
            expiresIn: _maxAge
        })
    }

    const _maxAge = 3 * 24 * 60 * 60;

