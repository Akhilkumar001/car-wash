const mongoose = require('mongoose')

const ServicesSchema = mongoose.Schema({

    id : {type : Number,required : true},
    name : {type : String, required : true},
    description : {type : String},
    costs : [
        {
            vehicleSize : {type : String, required : true},
            price : {type : Number, required : true}
        }
    ]
    
})


module.exports = mongoose.model("Services",ServicesSchema)