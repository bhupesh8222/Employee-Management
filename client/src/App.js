import React, { useState, useEf } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Order from './Components/Order';
import { Report } from './Components/Report';

import axios from './Components/axios.js';

function App() {
	/**/
	return (
		<div className='app'>
			<Router>
				<Switch>
					<Route path='/' exact component={Login} />
					<Route path='/home' exact component={Home} />
					<Route path='/order' component={Order} />
					<Route path='/report' component={Report} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
