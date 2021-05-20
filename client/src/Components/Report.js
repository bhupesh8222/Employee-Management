import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Report.css';
import Button from '@material-ui/core/Button';
import * as d3 from 'd3';
import BarGraphoptions from './createBarGraph';
import PieChartoptions from './createPieChart';
import { Line } from 'react-chartjs-2';
import state from './createLineChart';
import CanvasJSReact from '../canvasjs.react';
import axios from './axios.js';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Report() {
	useEffect(() => {
		axios
			.post('/report', {
				username: JSON.parse(localStorage.getItem('currentUser')).username,
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className='reports'>
			<div className='home_text'>
				<h1>REPORT</h1>
			</div>
			<div className='div_main_chart'>
				<div className='main_chart'>
					<div className='line_chart'>
						<Line
							data={state}
							options={{
								title: {
									display: true,
									text: 'Date wise sales',
									fontSize: 20,
								},
								legend: {
									display: true,
									position: 'right',
								},
							}}
						/>
					</div>
					<div className='pie_chart'>
						<CanvasJSChart
							options={PieChartoptions}
							/* onRef={ref => this.chart = ref} */
						/>
					</div>

					<div className='bar_graph'>
						<CanvasJSChart
							options={BarGraphoptions}
							/* onRef={ref => this.chart = ref} */
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export { Report };
