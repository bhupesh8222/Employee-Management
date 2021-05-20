const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressSession = require('express-session');
const EmployeeModel = require('./database/employee');
const RateModel = require('./database/ratelist');
const cors = require('cors');
const port = process.env.PORT || 2000;
const passport = require('passport');
const passportLocal = require('passport-local');

app.use(express.json());

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use(
	expressSession({
		secret: 'SECRET',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(EmployeeModel.authenticate()));
passport.serializeUser(EmployeeModel.serializeUser());
passport.deserializeUser(EmployeeModel.deserializeUser());

const url =
	'mongodb+srv://bhupesh:bhupesh@cluster0.dpcsz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
	.connect(url, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	.then((res) => console.log('DB CONNECTED'))
	.catch((err) => console.log(err));

//-----------WORKING-----------
//EmployeeModel.create({ usernaddme: 'Bhupesh' });

const authRoutes = require('./authentication.js');
app.use(authRoutes);

app.get('/ratelist', async (req, res) => {
	let ratelist = await RateModel.find();
	res.send(ratelist[0]);
});

app.post('/placeorder', async (req, res) => {
	try {
		await EmployeeModel.updateOne(
			{ username: req.body.username },
			{ $push: { orders: req.body.orders } }
		);

		res.send('ORDER ADDED');
	} catch (error) {
		console.log(error);
	}
});

//ROUTES FOR REPORT
app.post('/report', async (req, res) => {
	const employee = await EmployeeModel.findOne({ username: req.body.username });

	//line chart
	let lineChart = [];
	for (let i = 0; i < employee.orders.length; i = i + 1) {
		let obj = {
			x: employee.orders[i].date,
			y: employee.orders[i].totalAmount,
		};

		//console.log(obj.date == employee.orders[i + 1].date);
		while (
			i + 1 < employee.orders.length &&
			obj.x == employee.orders[i + 1].date
		) {
			obj.y = obj.y + employee.orders[i + 1].totalAmount;
			i = i + 1;
		}
		lineChart.push(obj);
	}

	//for pie chart

	let tea = 0,
		coffee = 0,
		samosa = 0,
		cake = 0;
	(ntea = 0), (ncoffee = 0), (nsamosa = 0), (ncake = 0);

	for (let i = 0; i < employee.orders.length; i = i + 1) {
		switch (employee.orders[i].item) {
			case 'tea':
				tea = tea + employee.orders[i].totalAmount;
				ntea = ntea + employee.orders[i].quantity;
				break;
			case 'coffee':
				coffee = coffee + employee.orders[i].totalAmount;
				ncoffee = ncoffee + employee.orders[i].quantity;
				break;
			case 'samosa':
				samosa = samosa + employee.orders[i].totalAmount;
				nsamosa = nsamosa + employee.orders[i].quantity;
				break;
			case 'cake':
				cake = cake + employee.orders[i].totalAmount;
				ncake = ncake + employee.orders[i].quantity;
		}
	}

	let barGraph = [
		{ label: 'tea', y: tea },
		{ label: 'coffee', y: coffee },
		{ label: 'samosa', y: samosa },
		{ label: 'cake', y: cake },
	];

	//Bar Graph
	let pieChart = [
		{ label: 'tea', y: ntea },
		{ label: 'coffee', y: ncoffee },
		{ label: 'samosa', y: nsamosa },
		{ label: 'cake', y: ncake },
	];

	let result = {
		lineChart: lineChart,
		pieChart: pieChart,
		barGraph: barGraph,
	};

	res.send(result);
});

app.listen(port, () => {
	console.log('SERVER STARED');
});
