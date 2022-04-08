var root = am5.Root.new("chartdiv");

// timezone
root.utc = true;
// interval count 
let intervalCount = 8;
// interval unit: "millisecond" | "second" | "minute"| "hour"| "day" | "week" | "month"| "year"
let intervalUnit = 'minute';


// svg path
var shape = "M7.82378 0.425105C7.66184 0.311535 7.43625 0.326682 7.29128 0.470547L7.29125 0.470581L2.89976 4.83287L1.00878 2.96869C1.00874 2.96865 1.00871 2.96862 1.00867 2.96858C0.846635 2.80789 0.583972 2.80793 0.421982 2.96869C0.259585 3.12985 0.259454 3.39132 0.422073 3.55229L0.422223 3.55244L2.60764 5.70663L7.82378 0.425105Z"



var chart = root.container.children.push(
	am5xy.XYChart.new(root, {})
);


let tooltipSettings = {
	fill: am5.color('#33333F'),
	fillOpacity: 0.8,
	stroke: am5.color('#000'),
	strokeOpacity: 0.04,
	strokeWidth: 4,
};


let tooltipText = (unit) => {
	return "[fontFamily: Montserrat #fff bold]{valueX.formatDate('dd.MM.yyyy HH:mm')}[/]\n[fontFamily: Montserrat #85858c] {name} : [fontFamily: Montserrat #fff bold] {valueY}" + unit;
}


var myTheme = am5.Theme.new(root);


var yAxis = chart.yAxes.push(
	am5xy.ValueAxis.new(root, {
		numberFormat: "#.###'  CH'",
		marginRight: 10,
	  	renderer: am5xy.AxisRendererY.new(root, {}),
	})
  );

yAxis.get("renderer").grid.template.setAll({
	visible: false
});

var yAxis2 = chart.yAxes.push(
	am5xy.ValueAxis.new(root, {
		numberFormat: "#.###'  K'",
		marginRight: 10,
		syncWithAxis: yAxis,
	  	renderer: am5xy.AxisRendererY.new(root, {
			opposite: true
		  }),
		
	})
  );

yAxis2.get("renderer").grid.template.setAll({
	visible: false
});



var xAxis = chart.xAxes.push(
	am5xy.DateAxis.new(root, {
		// groupData: true,
		// groupIntervals: [
		// 	{ timeUnit: "hour", count: 1 },
		// 	{ timeUnit: "minute", count: 8 }
		// ],
		baseInterval: { timeUnit: intervalUnit ||  'minute', count: intervalCount },
		dateField: "date",
		renderer: am5xy.AxisRendererX.new(root, {
			strokeOpacity: 0,
		})
	})
);


xAxis.get("renderer").grid.template.setAll({
		strokeWidth: 0.5,
		stroke: am5.color('#fffff'),
		// strokeGradient: am5.LinearGradient.new(root, {
		// 	stops: [{
		// 			brighten: 0.01
		// 		}, {
		// 			brighten: 1
		// 		}, {
		// 			brighten: 0.01
		// 		} 
		// 	],
		// 	rotation: 270
		// })

	}
);




myTheme.rule("AxisLabel").setAll({
	fill: "rgba(255, 255, 255, 0.6)",
	fontSize: "12px",
  });




var series = chart.series.push(
	am5xy.SmoothedXLineSeries.new(root, {
	name: "Pool Hashrate",
	xAxis: xAxis,
	yAxis: yAxis,
	valueYField: "value1",
	valueXField: "date",
	stroke: am5.color('#35B6FF'),
	tooltip: am5.Tooltip.new(root, {
	labelText: tooltipText(' CH'),
		getFillFromSprite: false,
		getStrokeFromSprite: false,
		layout: root.horizontalLayout
	}),
	cursorOverStyle: 'pointer',
	calculateAggregates: true
	})
);

var series2 = chart.series.push(
am5xy.SmoothedXLineSeries.new(root, {
	name: "Difficulty",
	xAxis: xAxis,
	yAxis: yAxis2,
	valueYField: "value2",
	valueXField: "date",
	stroke: am5.color('rgba(255, 255, 255, 0.5)'),
	strokeWidth: 6,
	tooltip: am5.Tooltip.new(root, {
	labelText: tooltipText(' K'),
	getFillFromSprite: false,
	getStrokeFromSprite: false,
	layout: root.horizontalLayout
	}),
	cursorOverStyle: 'pointer',
	calculateAggregates: true
})

);


let tooltip = series.getTooltip();
let tooltip2 = series2.getTooltip();

tooltip.get("background").setAll(tooltipSettings);
tooltip2.get("background").setAll(tooltipSettings);


  series.fills.template.setAll({
	visible: true,
	fillGradient: am5.LinearGradient.new(root, {
		stops: [{
			color: am5.color('rgba(53, 182, 255, 1)'),
			opacity: 0.35,
			offset: 0.17
		  }, {
			color: am5.color('rgba(27, 132, 215, 1)'),
			opacity: 0,
			offset: 0.98
		  }],
		  rotation: 90
		})
  });
  series.strokes.template.set("strokeWidth", 4);
  series2.strokes.template.setAll({
	  strokeWidth: 4,
	  stroke: am5.color("rgba(255, 255, 255, 0.7)"),
	  strokeOpacity: .4
	});


function getCircle(){
var circle =  am5.Circle.new(root, {
	radius: 4,
	fill: am5.color("#fff"),
	interactive: true,
	opacity: 0
});
circle.states.create("default", {
	opacity: 0
});

circle.states.create("hover", {
	opacity: 1
});
return circle;
}

series.bullets.push(function() {
	var circle = getCircle();
	return am5.Bullet.new(root, {
		sprite: circle
	});
});

series2.bullets.push(function() {
	var circle = getCircle();
	return am5.Bullet.new(root, {
		sprite: circle
	});
})

//avg line
var rangeDataItem = yAxis.makeDataItem({
	value: 24
});

var range = yAxis.createAxisRange(rangeDataItem);

rangeDataItem.get("grid").setAll({
	stroke: am5.color('#FF9900'),
	strokeDasharray: [5],
	strokeWidth: 1,
  	strokeOpacity: 1,
	visible: true
})

// scrollbar
var scrollbarX = am5xy.XYChartScrollbar.new(root, {
	orientation: "horizontal",
	height: 20,
	minHeight: 20,
	marginTop: 30,
	marginBottom: 20,
});

chart.set("scrollbarX", scrollbarX);
 
scrollbarX.get("background").setAll({
	fill: am5.color("#33333F"),
});

scrollbarX.overlay.setAll({
	interactive: false,
	fill: am5.color("#191820"),
	opacity: 1
})


scrollbarX.thumb.setAll({
	fill: am5.color("#33333F"),
	fillOpacity: 0,
});

scrollbarX.startGrip.setAll({
	interactive: true,
});

let buttonsStyle = {
	fill: am5.color("#33333F"),
	stroke: am5.color("#FFF"),
	strokeOpacity: .1,
	height: 40,
	width: 40,
	cornerRadiusBR: 8,
	cornerRadiusTR: 8,
	cornerRadiusTL: 8,
	cornerRadiusBL: 8
}

scrollbarX.startGrip.get("background").setAll(buttonsStyle);
scrollbarX.endGrip.get("background").setAll(buttonsStyle);

scrollbarX.startGrip.get("background").states.create("hover", {}).setAll({
	fill: am5.color("#35B6FF"),
});
scrollbarX.endGrip.get("background").states.create("hover", {}).setAll({
	fill: am5.color("#35B6FF"),
});

let sbxAxis = scrollbarX.chart.xAxes.push(
	am5xy.DateAxis.new(root, {
		groupData: true,
		groupIntervals: [
			{ timeUnit: "hour", count: 1 },
			{ timeUnit: "minute", count: 8 }
		],
		baseInterval: { timeUnit: intervalUnit ||  'minute', count: intervalCount },
		renderer: am5xy.AxisRendererX.new(root, {
			opposite: false,
			strokeOpacity: 0,
			fillOpacity: 0
		})
	})
);
  
let sbyAxis = scrollbarX.chart.yAxes.push(
	am5xy.ValueAxis.new(root, {
		renderer: am5xy.AxisRendererY.new(root, {
			strokeOpacity: 0,
			fillOpacity: 0
		})
	})
);

let sbseries = scrollbarX.chart.series.push(
am5xy.LineSeries.new(root, {
	xAxis: sbxAxis,
	yAxis: sbyAxis,
	valueYField: "value1",
	valueXField: "date",
	visible: false
})
);


  series.data.processor = am5.DataProcessor.new(root, {
	numericFields: ["value1"],
	dateFields: ["date"],
	dateFormat: "HH:mm"
  });
  series2.data.processor = am5.DataProcessor.new(root, {
	numericFields: ["value2"],
	dateFields: ["date"],
	dateFormat: "HH:mm"
  });
  sbseries.data.processor = am5.DataProcessor.new(root, {
	numericFields: ["value1"],
	dateFields: ["date"],
	dateFormat: "HH:mm"
  });


//set legend
var legend = chart.children.push(am5.Legend.new(root, {
		position: "relative",
		layout: root.gridLayout,
		y: 0,
		centerX: am5.percent(50),
		x: am5.percent(50),
		paddingTop: 10,
		paddingBottom: 10,
		useDefaultMarker: true,
	}) 
)
	
legend.markers.template.setup = function(marker) {
	var check = am5.Graphics.new(root, {
	  fill: am5.color("#fff"),
	  fillOpacity: 1,
	  stroke: am5.color('#fff'),
	  centerX: am5.percent(50),
	  x: am5.percent(50),
	  centerY: am5.percent(50),
	  y: am5.percent(50),
	  layer: 50,
	  width: 10,
	  height: 10,
	  svgPath: "M7.82378 0.425105C7.66184 0.311535 7.43625 0.326682 7.29128 0.470547L7.29125 0.470581L2.89976 4.83287L1.00878 2.96869C1.00874 2.96865 1.00871 2.96862 1.00867 2.96858C0.846635 2.80789 0.583972 2.80793 0.421982 2.96869C0.259585 3.12985 0.259454 3.39132 0.422073 3.55229L0.422223 3.55244L2.60764 5.70663L7.82378 0.425105Z"
	});
	check.states.create("disabled", {
		fillOpacity: 0,
		strokeOpacity: 0,

	  });
	
	marker.children.push(check);
}

legend.markerRectangles.template.setAll({
	width: 10,
	height: 10,
	layer: 20,
	fillGradient: am5.LinearGradient.new(root, { 
		stops: [{
			color: am5.color("#35B6FF"),
			opacity: 1,
			offset: 0.25
	  	}, 
		{
			color: am5.color("#1B84D7"),
			opacity: 1,
			offset: 0.75
	  	}],
		rotation: 90
	}),
	fill: am5.color('#fff'),
	cornerRadiusTL: 3,
	cornerRadiusTR: 3,
	cornerRadiusBL: 3,
	cornerRadiusBR: 3,
	stroke: am5.color('#fff'),
	strokeOpacity: .2,
	position: "relative"
});

legend.markerRectangles.template.states.create("disabled", {
	fillGradient: false,
	fill: am5.color('#fff'),
	fillOpacity: .08,
});

legend.markers.template.setAll({
	height: 10,
	width: 10
});

legend.labels.template.setAll({
	fontSize: 12,
	fontWeight: "600",
	fill: am5.color('#fff'),
	fontFamily: 'Montserrat',
	
});
legend.labels.template.states.create("disabled", {
	fillOpacity: .4,
});


chart.topAxesContainer.children.push(legend);
// legend border bottom
chart.topAxesContainer.children.push(am5.Rectangle.new(root, {
	width: am5.percent(100),
	height: 1,
	fill: am5.color('#fff'),
	fillOpacity: .12,
	layer: 50,
}));

chart.topAxesContainer.setAll({
	minWidth: am5.percent(100),
})
legend.data.setAll(chart.series.values);

// set cursor
chart.set("cursor", am5xy.XYCursor.new(root, {}));

var cursor = chart.get("cursor");
cursor.lineX.setAll({
	visible: false
});

cursor.lineY.setAll({
	visible: false
});

var previousBulletSprites = [];

cursor.events.on("cursormoved", cursorMoved);

function cursorMoved() {
	for(var i = 0; i < previousBulletSprites.length; i++) {
	  previousBulletSprites[i].unhover();
	}
	previousBulletSprites = [];
	chart.series.each(function(series) {
	  var dataItem = series.get("tooltip").dataItem;
	  if (dataItem) {
			var bulletSprite = dataItem.bullets[0].get("sprite");
			bulletSprite.hover();
			previousBulletSprites.push(bulletSprite);
		}
	});
};

root.setThemes([
	myTheme
]);


let arr = getData();


series.data.setAll(arr);
series2.data.setAll(arr);
sbseries.data.setAll(arr);


function getData(){
	let arr = [];
	
	for (let i = 0; i < 24; i++) {
		
		let data = i < 8 ? new Date(2022, 3, 5, 7, i*8).getTime() : new Date(2022, 3, 5, 8, i*8).getTime();
		// let test = new Date(2022, 3, 5, 8, i*8);
		let value1 =  getRandomArbitary(22, 26);
		let value2 = getRandomInt(70, 140);
		arr.push({'date': data, 'value1': value1, 'value2': value2});
		
	}
	return arr;
}

function getRandomInt(min, max) {
	return Math.floor(
		Math.random() * (max - min + 1)) + min; 
}

function getRandomArbitary(min, max) {
	return (Math.random() * (max - min) + min).toFixed(2);
}


