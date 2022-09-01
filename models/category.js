const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 분류 스키마
const productSchema = new Schema({
    product_name:
        {
            type: String,
            unique: true,
            required: true,
        },
    product_category:
        {
            firstCategory:{
                type: String,
                required: true,
            },
            secondCategory:{
                type: String,
                required: true,
            }
        },
    product_code:
        {
            type: String,
            unique:true,
            required: true,
        },
    rental_availability:
        {
            type: Boolean,
            default:false,
        },
    return_needed:
        {
            type: Boolean,
            default:false,
        },
    quantity:
        {
            type: Number,
            required: true,
        },
}, {versionKey : false})


module.exports = mongoose.model('product', productSchema);