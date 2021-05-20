let labels = [];
let data = [];
let lineChart;
if (JSON.parse(localStorage.getItem('report'))) {
	lineChart = JSON.parse(localStorage.getItem('report')).lineChart;
	for (let i = 0; i < lineChart.length; i = i + 1) {
		labels.push(lineChart[i].x);
		data.push(lineChart[i].y);
	}
}

const state = {
	labels: labels,
	datasets: [
		{
			label: 'Date wise sales',
			fill: false,
			lineTension: 0.5,
			backgroundColor: 'rgba(75,192,192,1)',
			borderColor: 'rgba(0,0,0,1)',
			borderWidth: 2,
			data: data,
		},
	],
};

export default state;
