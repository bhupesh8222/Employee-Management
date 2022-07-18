//REACT USEREDUCER HOOK--------------------------------------------------------

import React, { useContext, useEffect, useReducer } from 'react';
import { counterContext } from './Home';

function CounterNumber() {
	const counter = useContext(counterContext);

	// const actionA = {
	// 	type: 'Add',
	// 	number: 10,
	// };

	// const initialState = {
	// 	count: 0,
	// 	meta: 'TEMP_HPO',
	// };

	// const reducer = (state, action) => {
	// 	// let curr_count = curr_state.count;

	// 	const newState = {
	// 		...state,
	// 		count: state.count + action.number,
	// 	};
	// 	console.log(state);
	// 	return newState;
	// };

	// const [state, dispatch] = useReducer(reducer, initialState);

	const changeCount = () => {
		console.log('CLICKED');
		counter.dispatch();
	};

	// useEffect(() => console.log('Value of count', count), []);
	return <div onClick={changeCount}>{counter.count}</div>;
}

export default CounterNumber;
