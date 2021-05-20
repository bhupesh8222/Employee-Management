var express = require('express');
var router = express.Router();
const EmployeeModel = require('./database/employee.js');
const passport = require('passport');

router.post('/register', async (req, res) => {
	try {
		let newEmployee = new EmployeeModel({
			username: req.body.username,
		});

		let Employee = await EmployeeModel.register(newEmployee, req.body.password);
		await passport.authenticate('local');
		res.send(Employee);
	} catch (error) {
		console.log(error);
		res.status(500).send(console.error);
	}
});

router.post(
	'/login',
	passport.authenticate('local', { session: true }),
	(req, res) => {
		console.log('LOGGING IN');
		res.send(req.user);
	}
);

router.get('/logout', (req, res) => {
	console.log('LOGGING OUT!');
	req.logout();
	res.send('Logged Out!');
});

module.exports = router;
