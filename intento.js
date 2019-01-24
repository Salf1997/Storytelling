
crearCompositeLineal();
crearBarChartVentasTotales();
composicion();

function empezar(){
	var elmnt = document.getElementById("graficaCompositeLineas");
  	elmnt.scrollIntoView();
}

function crearBarChartVentasTotales(){
	var chart = dc.barChart('#graficaBarrasVentas');

  d3.json('html/ventas_total.json').then(function(counts) {
      var ndx            = crossfilter(counts),
          fruitDimension = ndx.dimension(function(d) {return d.Empresa;}),
          sumGroup       = fruitDimension.group().reduceSum(function(d) {return d.Global_Sales;});

      chart
          .width(768)
          .height(380)
          .x(d3.scaleBand())
          .xUnits(dc.units.ordinal)
          .brushOn(false)
          .dimension(fruitDimension)
          .barPadding(0.1)
          .outerPadding(0.05)
          .group(sumGroup);

      chart.render();
  });
}

function crearCompositeLineal(){
	var chart2 = dc.compositeChart("#graficaCompositeLineas");
	d3.csv("html/nintendo2.csv").then(function(experiments) {

		
	  var ndx                 = crossfilter(experiments),
	      dimension        = ndx.dimension(dc.pluck('Year')),
	      grupoNintendo       = dimension.group().reduceSum(dc.pluck('Nintendo'))
	      grupoMic       = dimension.group().reduceSum(dc.pluck('MicrosoftGS'))
	      grupoSony       = dimension.group().reduceSum(dc.pluck('SonyCE'))
	      grupoSega       = dimension.group().reduceSum(dc.pluck('Sega'));

	/*
	var ndx                 = crossfilter(experiments),
	      dimension        = ndx.dimension(function(d) {return +d.Year;}),
	      grupoNintendo       = dimension.group().reduceSum(function(d) {return d.Nintendo;})
	      grupoMic       = dimension.group().reduceSum(function(d) {return d.MicrosoftGS;})
	      grupoSony       = dimension.group().reduceSum(function(d) {return d.SonyCE;})
	      grupoSega       = dimension.group().reduceSum(function(d) {return d.Sega;});
	*/
		chart2
	    .width(768)
	    .height(480)
	    .x(d3.scaleLinear().domain([1982,2016]))
	    .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
	    .renderHorizontalGridLines(true) 
	   	.dimension(dimension)
		.compose([
		    dc.lineChart(chart2)
			    .colors('black')
			    .group(grupoSony, "Sony Computer Entertainment"),
		    dc.lineChart(chart2)
			    .colors('blue')
			    .group(grupoSega, "SEGA"),
		    dc.lineChart(chart2)
			    .colors('red')
			    .group(grupoNintendo, "Nintendo"),
		    dc.lineChart(chart2)
			    .colors('green')
			    .group(grupoMic, "Microsoft Game Studio")
		    ])
			.brushOn(true)
	        .render();

		});
}