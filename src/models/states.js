const mongoose = require('mongoose')


const States = new mongoose.Schema({
    stateName :{
        type:String,
        required:true,
        toLowerCase: true
    }
})

module.exports = mongoose.model('states', States)