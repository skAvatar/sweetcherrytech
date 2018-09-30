var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var product = new Schema ({
	nameProduct: String,
	description: String,	
	imageUrl: String,
	price: Number,
	active: Boolean
});

module.exports = mongoose.model('Product', product);