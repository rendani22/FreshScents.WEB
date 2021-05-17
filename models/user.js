const mongoose = require('mongoose'),
      encrypt = require('mongoose-encryption'),
      {isEmail} = require('validator');

var userSchema = new mongoose.Schema({
    username: {type: String, required: [true, "Please enter username"], unique: true,index: true, lowercase: true},
    firstName: String,
    lastName: String,
    password: {type: String, required: [true, "Please enter username"], minLength: [6, "Minimum password length is 6 characters"]},
    emailAddress: {type: String, required: true,unique: true, validate: [isEmail, "Please enter a valid email"]},
    dateCreated: {type: Date, default : Date.now},
    createdBy: {type: String, required: true},
    lastModified:  {type: Date, default : ""},
    grantAccess: {type: Boolean, default: true, required: true },
    dob: Date
});


var encKey = "s1QKQGTKpKA860Adl1GPvljMr2ddfg7nuryVQMjGsMs=";
var sigKey = "lzvk0+DK1aEsmYuqE9XWDTjv/041NnWz8aSyPADdI4TFSpgZhbudHnO+wwg4fzQ6pdMHsjGh0ApYcEzphQThzg==";

userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['password']});

userSchema.statics.login = async function(username, password){
    const user = await this.findOne({username});

    if(user){
        const auth = password === user.password;
        if(auth){
            if(user.grantAccess){
                return user
            }
            throw Error("Access denied")
        }
        throw Error("Incorrect password")
    }
    throw Error('Incorrect username')
}


userSchema.pre('save', function (next){
    console.log('User about to be saved');
    next();
});

userSchema.post('save', function (next){
    console.log('User created');
    next();
});

module.exports = new mongoose.model('users', userSchema);