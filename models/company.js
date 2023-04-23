const mongoose = require("mongoose")

const company = mongoose.Schema(
    {
        _id:{
            type:Number,
            unique:true
        },
        name:{
            type:String,
            unique:true
        },
        url:{
            type:String
        }
    }
)

module.exports = mongoose.model("Company",company)