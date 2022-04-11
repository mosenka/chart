
// LINE CHART 
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

// black theme
let tooltipText = (unit) => {
	return "[fontFamily: Montserrat #fff bold]{valueX.formatDate('dd.MM.yyyy HH:mm')}[/]\n[fontFamily: Montserrat #85858c] {name} : [fontFamily: Montserrat #fff bold] {valueY}" + unit;
}
// let tooltipText = (unit) => {
// 	return "[fontFamily: Montserrat #000 bold]{valueX.formatDate('dd.MM.yyyy HH:mm')}[/]\n[fontFamily: Montserrat #85858c] {name} : [fontFamily: Montserrat #000 bold] {valueY}" + unit;
// }

class BlackTheme extends am5.Theme {
	setupDefaultRules() {
		this.rule("AxisLabel").setAll({
			fontSize: 12,
			fill: am5.color("#fff"),
			opacity: 0.6,
		});
		
		this.rule("Grid").setAll({
			stroke: am5.color('#fff'),
			strokeWidth: 0.5,
			strokeGradient: am5.LinearGradient.new(root, {
				stops: [{
					opacity: 0.0001,
				}, {
					opacity: 0.6,
				}, {
					opacity: 0.0001,
				}],
				rotation: 90
			})

		});
		this.rule("Grid", ["yGrid"]).setAll({
			stroke: am5.color('#fff'),
			strokeWidth: 0.5,
			strokeGradient: am5.LinearGradient.new(root, {
				stops: [{
					opacity: 0.0001,
				}, {
					opacity: 0.6,
				}, {
					opacity: 0.0001,
				}],
				rotation: 0
			})

		});

		this.rule("PointedRectangle", ["tooltip", "background"]).setAll({
			fill: am5.color('#33333F'),
			fillOpacity: 0.8,
			stroke: am5.color('#000'),
			strokeOpacity: 0.04,
			strokeWidth: 4,
		});
		this.rule("Tooltip", ["tooltip"]).setAll({
			getFillFromSprite: false,
			getStrokeFromSprite: false,
			layout: root.horizontalLayout,

		});

		this.rule("RoundedRectangle", ['scrollbar', 'horizontal', 'main', 'background']).setAll({
			fillOpacity: 0,
			opacity: 0
		});

		this.rule('RoundedRectangle',  ['scrollbar', 'horizontal', 'xy', 'chart', 'thumb', 'horizontal']).setAll({
			fill: am5.color("#33333F"),
			fillOpacity: 0.6,
		});
		this.rule('RoundedRectangle',  ['scrollbar', 'horizontal', 'xy', 'chart', 'thumb', 'horizontal']).states.create("hover", {
			fill: am5.color("#33333F"),
			fillOpacity: 0.6,
			opacity: 1
		})
		
		this.rule("Graphics", ['overlay']).setAll({
			visible: false
		});

		this.rule('RoundedRectangle',  ['scrollbar', 'horizontal', 'xy', 'chart']).setAll({
			layer: 6
		});

		this.rule('RoundedRectangle',  ['scrollbar', 'xy', 'chart', 'resize', 'button', 'horizontal']).setAll({
				fill: am5.color("#33333F"),
				fillOpacity: 1,
				layer: 40,
				opacity: 1,
				stroke: am5.color("#FFF"),
				strokeOpacity: .1,
				height: 40,
				width: 40,
				cornerRadiusBR: 8,
				cornerRadiusTR: 8,
				cornerRadiusTL: 8,
				cornerRadiusBL: 8
		});
		this.rule('RoundedRectangle',  ['scrollbar', 'xy', 'chart', 'resize', 'button', 'horizontal']).states.create("hover", {
			fill: am5.color("#35B6FF"),
		});

		this.rule('Graphics',  ['scrollbar', 'xy', 'chart', 'resize', 'button', 'icon']).setAll({
			layer: 50,
			stroke: am5.color("#fff")
		})
	 
	}
}
class WhiteTheme extends am5.Theme {
	setupDefaultRules() {
		this.rule("AxisLabel").setAll({
			fontSize: 12,
			fill: am5.color("#1D1C28"),
			opacity: 0.6,
			fontFamily: 'Montserrat',
			fontWeight: "400",
		});
		this.rule("Grid").setAll({
			stroke: am5.color('#1D1C28'),
			strokeWidth: 0.5,
			strokeGradient: am5.LinearGradient.new(root, {
				stops: [{
					opacity: 0.0001,
				}, {
					opacity: 0.6,
				}, {
					opacity: 0.0001,
				}],
				rotation: 90
			})

		});
		this.rule("Grid", ["yGrid"]).setAll({
			stroke: am5.color('#1D1C28'),
			strokeWidth: 0.5,
			strokeGradient: am5.LinearGradient.new(root, {
				stops: [{
					opacity: 0.0001,
				}, {
					opacity: 0.6,
				}, {
					opacity: 0.0001,
				}],
				rotation: 0
			})

		});

		this.rule("PointedRectangle", ["tooltip", "background"]).setAll({
			fill: am5.color('#FFFFFF'),
			fillOpacity: 1,
			stroke: am5.color('#000'),
			strokeOpacity: 0.04,
			strokeWidth: 4,
		});
		this.rule("Tooltip", ["tooltip"]).setAll({
			getFillFromSprite: false,
			getStrokeFromSprite: false,
			layout: root.horizontalLayout,

		});

		this.rule("RoundedRectangle", ['scrollbar', 'horizontal', 'main', 'background']).setAll({
			fillOpacity: 0,
			opacity: 0
		});
	

		this.rule('RoundedRectangle',  ['scrollbar', 'horizontal', 'xy', 'chart', 'thumb', 'horizontal']).setAll({
			fill: am5.color("#33333F"),
			fillOpacity: 0.08,
		});
		this.rule('RoundedRectangle',  ['scrollbar', 'horizontal', 'xy', 'chart', 'thumb', 'horizontal']).states.create("hover", {
			fill: am5.color("#33333F"),
			fillOpacity: 0.06,
			opacity: 1,
		})
		
		this.rule("Graphics", ['overlay']).setAll({
			visible: false
		});

		this.rule('RoundedRectangle',  ['scrollbar', 'horizontal', 'xy', 'chart']).setAll({
			layer: 6
		});

		this.rule('RoundedRectangle',  ['scrollbar', 'xy', 'chart', 'resize', 'button', 'horizontal']).setAll({
				fill: am5.color("#EDEDF0"),
				fillOpacity: 1,
				layer: 40,
				opacity: 1,
				stroke: am5.color("rgba(29, 28, 40, 1)"),
				strokeOpacity: .04,
				height: 40,
				width: 40,
				cornerRadiusBR: 8,
				cornerRadiusTR: 8,
				cornerRadiusTL: 8,
				cornerRadiusBL: 8
		});
		this.rule('RoundedRectangle',  ['scrollbar', 'xy', 'chart', 'resize', 'button', 'horizontal']).states.create("hover", {
			fill: am5.color("#35B6FF"),
		});

		this.rule('Graphics',  ['scrollbar', 'xy', 'chart', 'resize', 'button', 'icon']).setAll({
			layer: 50,
			stroke: am5.color("#1D1C28")
		});
		
	 
	}
	
}

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
			opposite: true,
		}),
	})
  );

yAxis2.get("renderer").grid.template.setAll({
	visible: false
});

var xAxis = chart.xAxes.push(
	am5xy.DateAxis.new(root, {
		baseInterval: { timeUnit: intervalUnit ||  'minute', count: intervalCount },
		dateField: "date",
		renderer: am5xy.AxisRendererX.new(root, {
			strokeOpacity: 0,
		})
	})
);

// xAxis.get("renderer").grid.template.setAll({
// 	themeTags: ["xGrid"]
// });

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
		tooltip: am5.Tooltip.new(root, {
			labelText: tooltipText(' K'),
		}),
		cursorOverStyle: 'pointer',
		calculateAggregates: true
	})

);

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
series.strokes.template.setAll({
	strokeWidth: 4,

});
series2.strokes.template.setAll({
	strokeWidth: 4,
	stroke: am5.color("rgba(255, 255, 255, 0.7)"),
	strokeOpacity: .4
});


//set circle
function getCircle(){
	var circle =  am5.Circle.new(root, {
		radius: 6,
		fill: am5.color("#fff"),
		interactive: true,
		stroke: am5.color('#35B6FF'),
		strokeWidth: 4,
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
	opacity: 1,
	interactiveChildren: true,
	start: 0,
	end: 0.5,
});

chart.set("scrollbarX", scrollbarX);



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
		})
	})
);
  
let sbyAxis = scrollbarX.chart.yAxes.push(
	am5xy.ValueAxis.new(root, {
		renderer: am5xy.AxisRendererY.new(root, {
			strokeOpacity: 0,
		})
	})
);

let sbseries = scrollbarX.chart.series.push(
	am5xy.LineSeries.new(root, {
		xAxis: sbxAxis,
		yAxis: sbyAxis,
		valueYField: "value1",
		valueXField: "date",
		visible: false,
	
	})
);

scrollbarX.thumb.setAll({
	opacity: 1,
});

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
	// black theme
	// fill: am5.color('#fff'),
	// white theme
	fill: am5.color('#1D1C28'),
	fillOpacity: .08,
});

legend.markers.template.setAll({
	height: 10,
	width: 10
});


legend.labels.template.setAll({
	// themeTags: ["myLabel"],
	fontSize: 12,
	fontWeight: "600",
	// black theme
	fill: am5.color('#FFF'),
	// white theme
	// fill: am5.color('#000'),
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
	// black theme
	fill: am5.color('#fff'),
	// white theme
	fill: am5.color('#000'),
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
		if(previousBulletSprites[i]) {
			previousBulletSprites[i].unhover();
		}
	}
	previousBulletSprites = [];
	chart.series.each(function(series) {
	  var dataItem = series.get("tooltip").dataItem;
	  if (dataItem) {
			var bulletSprite = dataItem.bullets ? dataItem.bullets[0].get("sprite") : false;
			// var bulletSprite = dataItem.bullets[0].get("sprite");
			if(bulletSprite) {
				bulletSprite.hover();
			}
			previousBulletSprites.push(bulletSprite);
		}
	});
};

root.setThemes([
	BlackTheme.new(root)
	// WhiteTheme.new(root)
]);



let arr = getData();

series.data.setAll(arr);
series2.data.setAll(arr);

// for scrollbar
sbseries.data.setAll(arr);




// COLUMN CHART

var root2 = am5.Root.new("chartColumn");

var chart2 = root2.container.children.push(
	am5xy.XYChart.new(root2, {})
);

// y Axis for column series
var yAxisCln = chart2.yAxes.push(
	am5xy.ValueAxis.new(root2, {
		numberFormat: "#.###'  CH'",
		marginRight: 10,
	  	renderer: am5xy.AxisRendererY.new(root2, {
			themeTags: ["myAxisY"]
		}),
	})
);

yAxisCln.get("renderer").grid.template.setAll({
	themeTags: ["yGrid"],
	location: 1
	
});

// x Axis for column series
var xAxisCln = chart2.xAxes.push(
	am5xy.DateAxis.new(root2, {
		baseInterval: { timeUnit: "day", count: 1 },
		gridIntervals: [
			{ timeUnit: "day", count: 1 },
		  ],
		dateField: "date2",
		renderer: am5xy.AxisRendererX.new(root2, {
			cellStartLocation: 0.1,
			cellEndLocation: 0.9
		})
	})
);

xAxisCln.get("dateFormats")["day"] = "dd.MM";
xAxisCln.get("periodChangeDateFormats")["day"] = "dd.MM";

xAxisCln.get("renderer").grid.template.setAll({
	location: 0.5,
});

var clnSeries = chart2.series.push(
	am5xy.ColumnSeries.new(root2, {
		name: "Pool Hashrate2",
		xAxis: xAxisCln,
		yAxis: yAxisCln,
		valueYField: "value1",
		valueXField: "date2",
		cursorOverStyle: 'pointer',
	})
)
clnSeries.columns.template.setAll({
	cornerRadiusTL: 4,
	cornerRadiusTR: 4,
	strokeOpacity: 0,
	fillGradient: am5.LinearGradient.new(root2, {
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

clnSeries.data.processor = am5.DataProcessor.new(root2, {
	numericFields: ["value1"],
	dateFields: ["date2"],
	dateFormat: "yyyy-MM-dd"
  });

root2.setThemes([
	BlackTheme.new(root2)
	// WhiteTheme.new(root2)
]);

clnSeries.data.setAll(arr);



function getData(){
	let arr = [];
	
	for (let i = 0; i < 8; i++) {
		
		let data = i < 8 ? new Date(2022, 3, 5, 7, i*8).getTime() : new Date(2022, 3, 5, 8, i*8).getTime();
		let data2 = new Date(2022, 3, i+1).getTime();
		// let test = new Date(2022, 3, 5, 8, i*8);
		let value1 =  getRandomArbitary(22, 26);
		let value2 = getRandomInt(70, 140);
		arr.push({'date': data, 'value1': value1, 'value2': value2, 'date2': data2});
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


