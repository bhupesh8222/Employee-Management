let option;

if (JSON.parse(localStorage.getItem('report')))
	option = JSON.parse(localStorage.getItem('report')).pieChart;
else option = [];

const PieChartoptions = {
	exportEnabled: true,
	animationEnabled: true,
	title: {
		text: 'Product sold by quantity',
	},
	data: [
		{
			type: 'pie',
			startAngle: 75,
			toolTipContent: '<b>{label}</b>: {y}%',
			showInLegend: 'true',
			legendText: '{label}',
			indexLabelFontSize: 16,
			indexLabel: '{label} - {y}%',
			dataPoints: option,
		},
	],
};

export default PieChartoptions;
