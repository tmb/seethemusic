const mongoose = require('mongoose')

const visSchema = new mongoose.Schema({
	data: Object,
	key: String
})

module.exports = mongoose.model('Visualization', visSchema)