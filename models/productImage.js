var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    productName : {type: String, required : true},
    description : {type: String},
    status : {type: Boolean, required : true},
    gender : {type: String, required : true},
    popular : Boolean,
    dateAdded : {type : Date, default : Date.now},
    addedBy :  {type : String, required : true},
    lastModified:  {type : Date, default : ""},
    display : {type : Boolean, default : true},
    price : {type : Number, required : true},
    img:
    {
        data: {type: String, required : true},
        contentType: String
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('productDetails', imageSchema);