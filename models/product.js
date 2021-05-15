const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    const ProductSchema = new Schema({
        productName : {type: String, required : true},
        description : {type: String},
        status : {type: Boolean, required : true},
        gender : {type: String, required : true},
        popular : Boolean,
        dateAdded : {type : Date, default : Date.now},
        addedBy :  {type : String, required : true},
        lastModified:  {type : Date, default : ""},
        display : {type : Boolean, default : true},
        price : {type : Number, required : true}
    });

    module.exports = mongoose.model('product', ProductSchema);