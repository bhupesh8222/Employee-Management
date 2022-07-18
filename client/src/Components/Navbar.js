import React from 'react';

import './navbar.css';

function Navbar() {
	return (
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
	);
}

export default Navbar;
