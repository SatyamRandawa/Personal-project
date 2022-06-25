const mongoose = require('mongoose')

const Countries = new mongoose.Schema({
    CountryName: {
        type:String,
        required:true,
        toLowerCase: true
    }
},{timestamps:true})


module.exports = mongoose.model('country', Countries)