const mongoose = require("mongoose")
const company = require("./company")

const ads = mongoose.Schema(
    {
        _id:{
            type:Number,
            unique:true
        },
        companyId:{
            type:Number,
            ref:company,
            unique:true
        },
        primaryText:{
            type:String
        },
        headline:{
            type:String
        },
        description:{
            type:String
        },
        CTA:{
            type:String
        },
        imageUrl:{
            type:String
        }
    }
)

module.exports = mongoose.model("Ads",ads)