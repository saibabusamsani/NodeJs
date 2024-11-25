
const mongoose = require("mongoose");

const employeeSchema =new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        
    }

})

module.exports=mongoose.model("Emp",employeeSchema)