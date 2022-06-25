const mongoose = require('mongoose')

const cities = new mongoose.Schema({
    CountryName: {
        type:String,
        required:true,
        toLowerCase: true
    }
},{timestamps:true})


module.exports = mongoose.model('country', Countries)