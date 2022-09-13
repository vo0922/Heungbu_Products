const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 대여 스키마
const rentalSchema = new Schema({
            product_code:{
                type: String,
                required: true
            },
            emp_no:{
                type: String,
                required: true
            },
            rental_purpose:{
                type: String,
            },
            rental_date:{
                type: Date,
                required: true
            },
            return_date:{
                type: Date,
            },
            return_deadline:{
                type: Date,
                required: true
            },
            rental_status:{
                type: String,
                required: true,
                default: "대여중"
            }
}, {versionKey : false})

module.exports = mongoose.model('rental', rentalSchema);