const mongoose = require('mongoose');
const { Schema }=mongoose;


const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    description: {
    type: String,
    required: true,
    trim: true
},
image: {
    type: String,
    required: true,
    trim: true
},
stock:{
        type:Number,
        required:true,
        min:0
    }
});
const Product = mongoose.model('Product',productSchema);
module.exports=Product;
