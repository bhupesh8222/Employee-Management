import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Home.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from './axios';

function Home() {
	useEffect(() => {
		// axios
		// 	.post('/report', {
		// 		username: JSON.parse(localStorage.getItem('currentUser')).username,
		// 	})
		// 	.then((response) =>
		// 		localStorage.setItem('report', JSON.stringify(response.data))
		// 	)
		// 	.catch((err) => console.log(err));
	});
	const history = useHistory();
	const logout = () => {
		axios
			.get('/logout')
			.then((response) => {
				localStorage.removeItem('currentUser');
				localStorage.removeItem('report');
				history.push('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className='home'>
			<div className='topNavBar'>
				<div className='brand'>
					<a>ABC RESTAURENT</a>
				</div>
				<div className='otherLinks'>
					<a>Features</a>
					<a>Home</a>
					<a>Reports</a>
				</div>
			</div>
			<div className='home_text'>
				<h1>ABC</h1>
				<h1>Restaurent</h1>
			</div>
			{JSON.parse(localStorage.getItem('currentUser')) && (
				<>
					<div className='home_align'>
						<h3>
							Welcome #
							{JSON.parse(localStorage.getItem('currentUser')).username}
							<span> {localStorage.getItem('currentUser').username}</span>
						</h3>

						<Button onClick={logout} variant='contained' color='primary'>
							Logout
						</Button>
					</div>

					<div className='home_align home_bottom'>
						<Button
							onClick={() => history.push('/order')}
							size='large'
							variant='contained'
							color='secondary'>
							Add Order
						</Button>

						<Button
							onClick={() => history.push('/report')}
							size='large'
							variant='contained'
							color='secondary'>
							View Report
						</Button>
					</div>
				</>
			)}
			{!JSON.parse(localStorage.getItem('currentUser')) && (
				<h1 className='home_align'>ACCESS DENIED!</h1>
			)}
		</div>
	);
}

export default Home;
