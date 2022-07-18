//THIS SHOWS HOW CAN WE USE useContext and useReducer for global state management

//we passed the state and dispatch method to the respective level using the useContext hook
//at the child component, now we have the access to the dispatch and state - we can make update to the global state

import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	useReducer,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Home.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from './axios';
import { Counter } from './Counter';
import CounterNumber from './CounterNumber';
import TextField from '@material-ui/core/TextField';
let counterContext;
function Home() {
	counterContext = createContext();
	const initialState = {
		count: 0,
		meta: 'TEMP_HPO',
	};

	const reducer = (state, action) => {
		// let curr_count = curr_state.count;

		const newState = {
			...state,
			count: state.count + 1,
		};
		// console.log(state);
		return newState;
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const [orderItems, setorderItems] = useState([]);
	const [orderFlag, setOrderFlag] = useState(false);
	const [orderName, setorderName] = useState();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
			setUsers(response.data);
			console.log('CALLING');
		});
	}, []);
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

	const actionA = {
		type: 'Add',
		number: 10,
	};

	const changeCount = () => {
		console.log('CLICKED');
		dispatch(actionA);
	};

	const submitForm = (e) => {
		e.preventDefault();

		//the setter function also accets the funcion which takes the previous state as argument
		//and returns the new updated state
		setorderItems((previous) => [...previous, orderName]);
	};

	return (
		<div className='home'>
			<div className='home_text'>
				<h1>ABC Restaurent</h1>
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
							onClick={() => setOrderFlag(!orderFlag)}
							size='large'
							variant='contained'
							color='secondary'>
							{orderFlag ? 'Place order' : 'Done'}
						</Button>

						<Button
							onClick={() => history.push('/report')}
							size='large'
							variant='contained'
							color='secondary'>
							View Report
						</Button>
					</div>

					<div onClick={changeCount}>GLOBAL COUNT - {state.count}</div>

					{!orderFlag && (
						<div>
							<form onSubmit={submitForm}>
								<TextField
									variant='outlined'
									margin='normal'
									required
									fullWidth
									label='Enter the order to be placed'
									value={orderName}
									onChange={(e) => setorderName(e.target.value)}
									autoComplete='text'
									autoFocus
								/>
							</form>
						</div>
					)}

					<div className='tempOrders'>
						{orderItems.map((e) => {
							return <div>{e}</div>;
						})}
					</div>

					<counterContext.Provider value={{ state: state, dispatch: dispatch }}>
						<Counter />
					</counterContext.Provider>
				</>
			)}
			{!JSON.parse(localStorage.getItem('currentUser')) && (
				<h1 className='home_align'>ACCESS DENIED!</h1>
			)}
		</div>
	);
}

export { Home, counterContext };
