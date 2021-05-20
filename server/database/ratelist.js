const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
	tea: Number,
	coffee: Number,
	samosa: Number,
	cake: Number,
});

const RateModel = mongoose.model('ratelist', RateSchema);
module.exports = RateModel;
