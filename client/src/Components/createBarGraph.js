let option;

if (JSON.parse(localStorage.getItem('report')))
	option = JSON.parse(localStorage.getItem('report')).barGraph;
else option = [];
const BarGraphoptions = {
	animationEnabled: true,
	theme: 'light2', // "light1", "light2", "dark1", "dark2"
	title: {
		text: 'Product wise sales',
	},
	axisY: {
		title: 'Sales',
	},
	axisX: {
		title: 'Items',
		labelAngle: 0,
	},
	data: [
		{
			type: 'column',
			dataPoints: option,
		},
	],
};

export default BarGraphoptions;
