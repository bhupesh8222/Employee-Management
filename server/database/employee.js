const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const EmployeeSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: 1,
	},

	password: String,

	orders: [
		{
			item: String,
			quantity: Number,
			totalAmount: Number,
			date: String,
		},
	],
});

EmployeeSchema.plugin(passportLocalMongoose);

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);
module.exports = EmployeeModel;
