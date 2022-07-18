import React, { useEffect, useState, useContext, createContext } from 'react';
import CounterNumber from './CounterNumber';
import './counter.css';
let countContext;
function Counter() {
	const [count, setCount] = useState(0);
	countContext = createContext(count);
	return (
		<div className='counter'>
			<div className='counterBox'>
				<div onClick={(count) => count + 1}>+</div>
				<CounterNumber />
				<div onClick={(count) => count - 1}>-</div>
			</div>
		</div>
	);
}

export { Counter, countContext };
