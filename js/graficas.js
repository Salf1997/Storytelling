graphLineSec2();
$(document).ready(function(){
  barra("Nintendo","Action");
    $("input[type='button']").click(function(){
            var radioValue = $("input[name='plataforma']:checked").val();
            if(radioValue){
                $(document).on('change','#generoNintendo',function(){
                  var valor = $('#generoNintendo>option:selected').text();
                  barra(radioValue,valor);
                });
            }
    });  
});



function graphLineSec2(){
  var linea1 = dc.compositeChart("#ventascomp_sony_nin_sega");
  d3.csv("data/90-00/nintendo_sega_sony_902000.csv").then(function(experiments) {

  var ndx               = crossfilter(experiments),
        dimension       = ndx.dimension(dc.pluck('Year')),
        grupoNintendo   = dimension.group().reduceSum(dc.pluck('Nintendo'))
        grupoSony       = dimension.group().reduceSum(dc.pluck('Sony'))
        grupoSega       = dimension.group().reduceSum(dc.pluck('Sega'));


  linea1
      .width(768)
      .height(480)
      .x(d3.scaleLinear().domain([1990,2000]))
      .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
      .renderHorizontalGridLines(true) 
      .dimension(dimension)
    .compose([
        dc.lineChart(linea1)
          .colors('blue')
          .group(grupoSega, "SEGA"),
        dc.lineChart(linea1)
          .colors('red')
          .group(grupoNintendo, "Nintendo"),
        dc.lineChart(linea1)
          .colors('green')
          .group(grupoSony, "Sony")
        ])
      .brushOn(true)
      .render();
      });

  var linea2 = dc.compositeChart("#ventascomp_sony_nin_sega_jap");
  d3.csv("data/90-00/nintendo_sega_sony_902000_jap.csv").then(function(experiments) {

  var ndx               = crossfilter(experiments),
        dimension       = ndx.dimension(dc.pluck('Year')),
        grupoNintendo   = dimension.group().reduceSum(dc.pluck('Nintendo'))
        grupoSony       = dimension.group().reduceSum(dc.pluck('Sony'))
        grupoSega       = dimension.group().reduceSum(dc.pluck('Sega'));


  linea2
      .width(768)
      .height(480)
      .x(d3.scaleLinear().domain([1990,2000]))
      .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
      .renderHorizontalGridLines(true) 
      .dimension(dimension)
    .compose([
        dc.lineChart(linea2)
          .colors('blue')
          .group(grupoSega, "SEGA"),
        dc.lineChart(linea2)
          .colors('red')
          .group(grupoNintendo, "Nintendo"),
        dc.lineChart(linea2)
          .colors('green')
          .group(grupoSony, "Sony")
        ])
      .brushOn(true)
      .render();
      });
}

var barra_nintendo_sec2 = dc.barChart('#graph_barras_ventas_genero_sec2');

function barra(json,valor){
  console.log("Este es el valor del select: " + valor + "y el valor del json: " +json);
  d3.json('data/90-00/'+json+'_902000_ventas_generos.json').then(function(counts) {
      var ndx            = crossfilter(counts),
          fruitDimension = ndx.dimension(function(d) {return d.Year;});

      var sumGroup;
      if (valor=='Action') {
          sumGroup = fruitDimension.group().reduceSum(function(d) {return d.Action;});
      } if (valor=='Puzzle') {
        sumGroup = fruitDimension.group().reduceSum(function(d) {return d.Puzzle;});
      } if (valor=='Adventure') {
        sumGroup = fruitDimension.group().reduceSum(function(d) {return d.Adventure;});
      } if (valor=='Misc') {
        sumGroup = fruitDimension.group().reduceSum(function(d) {return d.Misc;});
      } if (valor=='Fighting') {
        sumGroup = fruitDimension.group().reduceSum(function(d) {return d.Fighting;});
      } if (valor=='Platform') {
        sumGroup = fruitDimension.group().reduceSum(function(d) {return d.Platform;});
      } if (valor=='Racing') {
        sumGroup = fruitDimension.group().reduceSum(function(d) {return d.Racing;});
      } if (valor=='RolePlaying') {
        sumGroup = fruitDimension.group().reduceSum(function(d) {return d.RolePlaying;});
      } if (valor=='Shooter') {
        sumGroup = fruitDimension.group().reduceSum(function(d) {return d.Shooter;});
      } if (valor=='Simulation') {
        sumGroup = fruitDimension.group().reduceSum(function(d) {return d.Simulation;});
      } if (valor=='Sports') {
        sumGroup = fruitDimension.group().reduceSum(function(d) {return d.Sports;});
      } if (valor=='Strategy') {
        sumGroup = fruitDimension.group().reduceSum(function(d) {return d.Strategy;});
      } 
      barra_nintendo_sec2
          .width(768)
          .height(380)
          .x(d3.scaleBand())
          .xUnits(dc.units.ordinal)
          .brushOn(false)
          .dimension(fruitDimension)
          .barPadding(0.1)
          .outerPadding(0.05)
          .group(sumGroup);

      barra_nintendo_sec2.render();
  });
}