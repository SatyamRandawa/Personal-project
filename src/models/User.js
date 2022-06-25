const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country:{
          type:String,
          reequired:true
    },
    state: {
          type:String,
          required:true
    },
    city:{
         type:String,
         required:true
    },
    email:{
        type:String,
        required:true,
        Unique:true   
    },
    password:{
        type:String,
        required:true
    }
    
},{timestamps:true})


module.exports = mongoose.model('user', userSchema)