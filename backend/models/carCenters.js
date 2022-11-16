const mongoose = require('mongoose')

const CarCenterSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    location:{  
        type:String,
        required:true
    },
    email:{  
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    services : [{type : Number}]
})


module.exports = mongoose.model("Center",CarCenterSchema)