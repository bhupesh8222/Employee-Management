import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Home.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Order.css';
import axios from './axios';

const useStyles = makeStyles((theme) => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Order() {
	const classes = useStyles();
	const [state, setState] = useState({
		item: 'tea',
		Quantity: '',
		amount: '',
		ratelist: {},
		orderplaced: false,
	});

	useEffect(() => {
		axios
			.get('/ratelist')
			.then((res) => {
				setState({ ...state, ratelist: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const findMultiplier = (value) => {
		let multiplier;
		switch (value) {
			case 'tea':
				multiplier = state.ratelist.tea;
				break;
			case 'coffee':
				multiplier = state.ratelist.coffee;
				break;
			case 'cake':
				multiplier = state.ratelist.cake;
				break;
			case 'samosa':
				multiplier = state.ratelist.samosa;
				break;
		}
		return multiplier;
	};

	const CalculateTotalAmount = (e) => {
		//In total amount, it was giving error in console, as we can't parse integer from empty string
		if (e.target.value === '' || parseInt(e.target.value) < 0) {
			setState({
				...state,
				Quantity: '',
				amount: 0,
			});
		} else {
			const multiplier = findMultiplier(state.item);
			setState({
				...state,
				orderplaced: false,
				Quantity: e.target.value,
				amount: multiplier * parseInt(e.target.value),
			});
		}
	};

	const placeOrder = (e) => {
		e.preventDefault();
		const obj = {
			username: JSON.parse(localStorage.getItem('currentUser')).username,
			orders: {
				item: state.item,
				quantity: state.Quantity,
				totalAmount: state.amount,
				date: new Date().toLocaleString().slice(0, 9), //extracting date only
			},
		};
		axios.post('/placeorder', obj).then((res) => {
			console.log(res.data);
			setState({ ...state, orderplaced: true });
		});
	};

	return (
		<div>
			<div className='home_text'>
				<h1>ABC</h1>
				<h1>Restaurent</h1>
			</div>

			<div className='placeorder'>
				<div>
					<h2>Add Order</h2>
				</div>
				<form onSubmit={(e) => placeOrder(e)}>
					<div>Select item</div>
					<select
						onChange={(e) => {
							setState({
								...state,
								orderplaced: false,
								item: e.target.value,
								amount: findMultiplier(e.target.value) * state.Quantity,
							});
						}}
						value={state.item}>
						<option value='tea'>Tea</option>
						<option value='coffee'>Coffee</option>
						<option value='samosa'>Samosa</option>
						<option value='cake'>Cake</option>
					</select>
					<TextField
						variant='outlined'
						margin='normal'
						fullWidth
						required
						value={state.Quantity}
						onChange={(e) => {
							CalculateTotalAmount(e);
						}}
						label='Enter Quantity'
						type='number'
						required
					/>
					<TextField
						variant='outlined'
						margin='normal'
						fullWidth
						required
						value={state.amount}
						label='Total Amount'
						type='text'
						required
					/>

					<Button
						className={classes.submit}
						type='submit'
						fullWidth
						variant='contained'
						color='primary'>
						Place Order
					</Button>
				</form>
			</div>
			{state.orderplaced && (
				<h1 className='home_text'>Order placed successfully!</h1>
			)}
		</div>
	);
}

export default Order;
