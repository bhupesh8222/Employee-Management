import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import axios from './axios';
import './Login.css';

const useStyles = makeStyles((theme) => ({
	outerdiv: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	form: {
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Login() {
	const history = useHistory();
	const classes = useStyles();
	const [state, setState] = useState({
		isError: false,
		username: '',
		password: '',
	});

	const submitForm = (e) => {
		e.preventDefault();
		axios
			.post('/login', {
				username: state.username,
				password: state.password,
			})
			.then((response) => {
				console.log(response.data);
				localStorage.setItem('currentUser', JSON.stringify(response.data));
				history.push('/home');
			})
			.catch((error) => {
				console.log(error);
				setState({ ...state, isError: true });
			});
	};

	return (
		<Container component='main' maxWidth='xs'>
			<div className={classes.outerdiv}>
				<Typography component='h1' variant='h5'>
					Employee Management - Sign in
				</Typography>
				<form className={classes.form} onSubmit={submitForm}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Enter Employee Name'
						value={state.username}
						onChange={(e) =>
							setState({
								...state,
								username: e.target.value,
								isError: false,
							})
						}
						autoComplete='text'
						autoFocus
						required
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						value={state.password}
						onChange={(e) =>
							setState({
								...state,
								password: e.target.value,
								isError: false,
							})
						}
						label='Enter Password'
						type='password'
						required
					/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Sign In
					</Button>
				</form>
			</div>
			{state.isError && (
				<Box mt={8}>
					<h3>SOMETHING IS WRONG!!!</h3>
					<p>Enter correct details .</p>
				</Box>
			)}
		</Container>
	);
}
