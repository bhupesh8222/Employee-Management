//REACT USEREDUCER HOOK--------------------------------------------------------

import React, { useContext, useEffect, useReducer } from 'react';
import { counterContext } from './Home';

function CounterNumber() {
	const counter = useContext(counterContext);

	//MAKING UPDATE TO THE GLOBAL STATE
	const changeCount = () => {
		console.log('CLICKED');
		counter.dispatch();
	};

	// useEffect(() => console.log('Value of count', count), []);
	return <div onClick={changeCount}>{counter.count}</div>;
}

export default CounterNumber;
