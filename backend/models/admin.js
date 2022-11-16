const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({

    userName:{
        type:String,
        required:true
    },
    password:{
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
    }
})


module.exports = mongoose.model("Admin",AdminSchema)