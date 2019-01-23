//////////////////////////////////////////////////////////////////////////
// scrollVis
// Visualizacion de los elementos controlados por el scroll
//////////////////////////////////////////////////////////////////////////
var scrollVis = function (data3, data7, reliability, matrizblanco) {

    // Definicion tamano de svg y margenes de la visualizacion
    var width = 440;
    var height = 440;
    var margin = { top: 10, left: 40, bottom: 40, right: 10 };

    // Indices para controlar el paso de una seccion a otra
    var lastIndex = -1;
    var activeIndex = 0;

    // Cuando se realiza el scrolling se iran actividando las funciones correspondientes al indice
    var activateFunctions = [];
    
    // Definicion de colores de los agentes
    var colorBattery = "#5BBEC0";
    var colorSparkPlug= "#5FB677";
    var colorBrake = "#A6C732";
    var wrong = "#E94F53"

    // Elementos SVG definidos mediante path
    var car = [{
      fillOk: "DimGrey",
      fillBad: wrong,
      d: "M29.3,98.9c0,1.8,0.2,3.4,0.6,5.1c2.3,9.8,11.1,17.2,21.6,17.2c9.5,0,17.5-5.9,20.7-14.3c1-2.5,1.5-5.1,1.5-8c0-12.3-10-22.2-22.2-22.2C39.3,76.7,29.3,86.6,29.3,98.9z M49.8,94.6l-8-8c2.3-1.8,5-3,8-3.3V94.6z M53.4,83.2c3,0.3,5.8,1.5,8,3.3l-8,8V83.2z M53.4,103.3l8,8c-2.3,1.8-5,3-8,3.3V103.3z M49.8,114.6c-3-0.3-5.8-1.5-8-3.3l8-8V114.6z M39.2,108.7c-1.8-2.3-3-5-3.3-8h11.4L39.2,108.7z M39.2,89.1l8,8H35.9C36.2,94.1,37.4,91.3,39.2,89.1z M67.3,97.1H55.9l8-8C65.8,91.3,66.9,94.1,67.3,97.1z M64,108.7l-8-8h11.4C66.9,103.7,65.8,106.5,64,108.7z M1,86.2l1.2,1.2c0,0-0.3,6.1,1,7.1L1.5,96L2,98.2c0,0-0.3,2.9,0.4,3.2c0.6,0.3,2.2,2.9,2.2,2.9l20.8,2.6c0,0-0.1-0.8-0.2-2c-0.4-5.7-0.5-21.8,8.7-27.2C45.2,71,59.5,69,69.4,80.8c9.9,11.8,8.1,26.7,8.1,26.7l129.6-0.7c0,0-1.1-20.2,9.2-26.6c10.3-6.4,22-9.9,34.6,0.2c12.6,10.1,8.4,22.5,8.4,22.5s10.2-0.3,14.8-7.3c0,0,1.6-2.5,1.1-9c0,0,0.8-0.2,0.7-1.1c-0.1-0.9-1.5-9.6-1.5-9.6s-1.2-0.9-2-1c0,0-0.9-4.3-1.8-4.6l0.9-4c0,0-5.1-6.1-7.9-7.9c-2.8-1.7-8.4-6.3-8.4-6.3l-12.1,0.5L240.7,30h6.8l1.1-1.2c0,0,0.5-1.9-0.1-2.3c-0.6-0.4-8.3-0.4-9.3-0.4c-0.3,0-5.3-0.4-12.7-1l-0.2,0c0,0-0.1,0-0.1,0c-1.5-2.1,14-23.1,14.5-23.9c0.5-0.8-0.6-0.5-0.6-0.5s-14.9,23.2-16.7,23.2c-1.7,0-2.9,0.8-2.9,0.8c-15.5-1.2-37.1-2.8-49.5-2.9c-20.7-0.2-43.5,0.9-51.4,5.2l1.9,1.2l0.7,0.8c-12.1,3.2-40.5,23.7-40.5,23.7h-8L73,51.5c0,0-36.5,3.8-53.3,10.2C7.9,65.9,4.2,76.1,4.2,76.1s-1.9,0.3-1.7,4.3c0,0-0.8-0.1-1.2,0.8C0.9,82.1,1,86.2,1,86.2z M29.9,72.4L5.7,74.6c0,0,4.9-6.7,6.3-7.6c1.4-0.9,9.3-2.1,9.3-2.1C22.9,65.3,29.9,72.4,29.9,72.4z M76,80.6L76,80.6C76,80.6,76,80.6,76,80.6L76,80.6z M84.3,82c0,0,120.9-3.9,120.4-2.6c-1.8,5.1-10.7,4.610.7,4.6S90.9,87.1,87.5,86.8C84.1,86.6,84.3,82,84.3,82z M172.2,65.7l-14.1,0.2c0,0-1.5-0.2-1.5-0.9c0-0.7,1.7-1.1,1.7-1.1l13.7-0.8c0,0,1.2,0.3,1.1,1.3C173.1,65.4,172.2,65.7,172.2,65.7z M175.2,25.9l-3.8,28.4l-73.7,4l0.2-1.6c0,0,2.8-1.5,3-2.1c0.3-0.6-0.1-5.2-0.6-6.2c-0.5-0.9-1.4-0.7-1.4-0.7l0.6-4.8c0,0,7.2-6.6,23-12.6C138.3,24.3,175.2,25.9,175.2,25.9z M236.2,51c-2,2.6-59.6,3.4-59.6,3.4l1.1-28.4 C217.5,26.7,236.8,50.2,236.2,51z M269.6,69.2c-3.5-3.2-24.4-3-24.4-3l-1.7-11.3l7.2-0.2c11.2,2.7,19,12,19,12V69.2z M210.2,98.9c0,2.7,0.5,5.2,1.4,7.6c3.1,8.5,11.3,14.6,20.9,14.6c10.8,0,19.8-7.7,21.8-17.9c0.3-1.4,0.4-2.9,0.4-4.4c0-12.3-10-22.2-22.2-22.2C220.1,76.7,210.2,86.6,210.2,98.9z M230.6,94.6l-8-8c2.3-1.8,5-3,8-3.3V94.6z M234.2,83.2c3,0.3,5.8,1.5,8,3.3l-8,8V83.2z M234.2,103.3l8,8c-2.3,1.8-5,3-8,3.3V103.3z M230.6,114.6c-3-0.3-5.8-1.5-8-3.3l8-8V114.6z M220,108.7c-1.8-2.3-3-5-3.3-8h11.4L220,108.7z M220,89.1l8,8h-11.4C217,94.1,218.2,91.3,220,89.1z M248.1,97.1h-11.4l8-8C246.6,91.3,247.8,94.1,248.1,97.1z M244.8,108.7l-8-8h11.4C247.8,103.7,246.6,106.5,244.8,108.7z"
    }];

    var battery = [{
      fillOk: colorBattery,
      fillBad: wrong,
      d: "M4.9,14.6v33.1h51.6V14.6H4.9z M20.4,28.1h-3.8v3.8h-2.7v-3.8H10v-2.8h3.8v-3.8h2.7v3.8h3.8V28.1z M27,35l3.5-6.9H27l7.3-8.4L31.6,26l3.3-0.1L27,35z M51.4,28.1H41v-2.8h10.3V28.1z M15.2,3.8v3.4h-6V3.8c0-1.7,1.3-3,3-3c0.8,0,1.6,0.3,2.1,0.9C14.9,2.2,15.2,3,15.2,3.8z M51.4,3.8v3.4h-6V3.8c0-1.7,1.3-3,3-3c0.8,0,1.6,0.3,2.1,0.9C51,2.2,51.4,3,51.4,3.8z M2.3,8.6 h56.4 v4 h-56.4 z"
    }];

    var sparkPlug = [{
      fillOk: colorSparkPlug,
      fillBad: wrong,
      d: "M25.8,51.6 h8.6 v1.7 h-8.6 z M24.1,33.7 h12.5 v1.1 h-12.5 z M22.7,32.3l0-0.6c0,0.3,0.3,0.6,0.6,0.6l2.8,0c0.3,0,0.6-0.3,0.6-0.6c0,0.3,0.3,0.6,0.6,0.6l5.9,0c0.3,0,0.6-0.3,0.6-0.6c0,0.3,0.3,0.6,0.6,0.6l2.8,0c0.4,0,0.6-0.3,0.6-0.6l0,0.6c0,0.3-0.3,0.6-0.6,0.6L23.3,33C22.9,32.9,22.7,32.7,22.7,32.3z M38.1,29.5l0,0.5c-0.1-0.3-0.3-0.5-0.6-0.5l-2.8,0c-0.4,0-0.6,0.3-0.6,0.6c0-0.3-0.3-0.6-0.6-0.6l-5.9,0c-0.3,0-0.6,0.3-0.6,0.6c0-0.3-0.3-0.6-0.6-0.6l-2.8,0c-0.4,0-0.6,0.3-0.6,0.6l0,1.7l0-2.3c0-0.3,0.3-0.6,0.6-0.6l14.1,0.1C37.8,28.9,38.1,29.2,38.1,29.5z M38.1,30C38.1,30.1,38.1,30.1,38.1,30l0,1.2L38.1,30z M25.8,38.6c-0.3,0-0.6,0.3-0.6,0.8c0,0.4,0.3,0.8,0.6,0.8c-0.3,0-0.6,0.3-0.6,0.7c0,0.4,0.3,0.7,0.6,0.8c-0.3,0-0.6,0.3-0.6,0.7c0,0.4,0.3,0.7,0.6,0.8c-0.3,0-0.6,0.3-0.6,0.8c0,0.4,0.3,0.7,0.6,0.8c-0.3,0-0.6,0.3-0.6,0.8c0,0.4,0.3,0.7,0.6,0.8c-0.3,0-0.6,0.3-0.6,0.7c0,0.4,0.3,0.8,0.6,0.8c-0.3,0-0.6,0.3-0.6,0.7c0,0.4,0.3,0.8,0.6,0.8c-0.3,0-0.6,0.3-0.6,0.7c0,0.4,0.3,0.8,0.6,0.8l9,0.1c0.3,0,0.6-0.3,0.6-0.7c0-0.4-0.3-0.8-0.6-0.8c0.3,0,0.6-0.3,0.6-0.7c0-0.4-0.3-0.7-0.6-0.8c0.3,0,0.6-0.3,0.6-0.7c0-0.4-0.3-0.8-0.6-0.8c0.3,0,0.6-0.3,0.6-0.7c0-0.4-0.3-0.8-0.6-0.8c0.3,0,0.6-0.3,0.6-0.7c0-0.4-0.3-0.8-0.6-0.8c0.3,0,0.6-0.3,0.6-0.7c0-0.4-0.3-0.8-0.6-0.8c0.3,0,0.6-0.3,0.6-0.7c0-0.4-0.3-0.8-0.6-0.8c0.3,0,0.6-0.3,0.6-0.7c0-0.4-0.3-0.8-0.6-0.8c0.3,0,0.6-0.3,0.6-0.7c0-0.4-0.3-0.8-0.6-0.8c0.3,0,0.6-0.3,0.6-0.7c0-0.4-0.3-0.8-0.6-0.8l-9-0.1c-0.3,0-0.6,0.3-0.6,0.7c0,0.4,0.3,0.7,0.6,0.8c-0.3,0-0.6,0.3-0.6,0.7C25.2,38.3,25.5,38.6,25.8,38.6z M35.9,24.1l0,3.9l-10.8,0l0-4c0-1.2,1-2.2,2.2-2.2l6.5,0C35,21.9,35.9,22.9,35.9,24.1z M27.1,17.2c-0.6,0-1.1,0.4-1.1,0.9c0,0.5,0.5,1,1,1c-0.6,0-1.1,0.4-1.1,0.9c0,0.5,0.5,1,1,1l7,0.1c0.6,0,1.1-0.4,1.1-0.9c0-0.5-0.5-1-1.1-1c0.6,0,1.1-0.4,1.1-0.9c0-0.5-0.5-1-1.1-1c0.6,0,1.1-0.4,1.1-0.9c0-0.5-0.5-1-1.1-1c0.6,0,1.1-0.4,1.1-0.9c0-0.5-0.5-1-1.1-1l-7-0.1c-0.6,0-1.1,0.4-1.1,0.9c0,0.5,0.5,1,1,1c-0.6,0-1.1,0.4-1.1,0.9C26.1,16.8,26.5,17.2,27.1,17.2z M27.5,8.5l0,4.1l6.5,0l0-4.1c0-0.9-0.7-1.6-1.6-1.8c-0.1,0-0.3,0-0.4,0l-2.3,0c-0.1,0-0.3,0-0.4,0C28.2,6.9,27.5,7.6,27.5,8.5z M29.1,3.1l0,3c0.1,0,0.3,0,0.4,0l2.3,0c0.1,0,0.3,0,0.4,0.1l0-3c0-0.3-0.3-0.6-0.6-0.6l-2,0C29.4,2.5,29.1,2.8,29.1,3.1z M26.8,54c0,1.9,1.6,3.5,3.5,3.5l0-0.6c-1.6,0-2.9-1.3-2.9-2.9L26.8,54z M28.3,54 h3.8 v1.1 h-3.8 z M29.3,55.1 h1.8 v0.8 h-1.8 z"
    }];

    var brake = [{
      fillOk: colorBrake,
      fillBad: wrong,
      d: "M48.2,32c0.8-6.3-2-11.8-6.3-15.3l6.9-6.9c-4.9-4.3-11.3-7-18.4-7C15.2,2.8,2.7,15.2,2.7,30.5c0,15.3,12.4,27.7,27.7,27.7c14.8,0,26.9-11.6,27.7-26.2H48.2z M30.5,46.8c-9,0-16.3-7.3-16.3-16.3c0-9,7.3-16.3,16.3-16.3c9,0,16.3,7.3,16.3,16.3C46.7,39.5,39.5,46.8,30.5,46.8z M30.5,15.3c-8.4,0-15.3,6.9-15.3,15.3c0,8.4,6.8,15.3,15.3,15.3c8.4,0,15.3-6.9,15.3-15.3C45.7,22.1,38.9,15.3,30.5,15.3z M30.4,18.2c1.2,0,2.1,1,2.1,2.1c0,1.2-1,2.1-2.1,2.1c-1.2,0-2.1-0.9-2.1-2.1C28.3,19.2,29.3,18.2,30.4,18.2z M20.8,29.6c-1.2,0-2.1-0.9-2.1-2.1c0-1.2,0.9-2.1,2.1-2.1c1.2,0,2.1,0.9,2.1,2.1C22.9,28.7,21.9,29.6,20.8,29.6z M24.4,41c-1.2,0-2.1-1-2.1-2.1c0-1.2,0.9-2.1,2.1-2.1c1.2,0,2.1,0.9,2.1,2.1C26.5,40.1,25.6,41,24.4,41z M24,30.5c0-3.6,2.9-6.4,6.4-6.4c3.5,0,6.4,2.9,6.4,6.4c0,3.5-2.9,6.4-6.4,6.4C26.9,36.9,24,34.1,24,30.5z M36.5,41c-1.2,0-2.1-1-2.1-2.1c0-1.2,0.9-2.1,2.1-2.1c1.2,0,2.1,0.9,2.1,2.1C38.6,40.1,37.6,41,36.5,41z M40.2,29.6c-1.2,0-2.1-0.9-2.1-2.1c0-1.2,0.9-2.1,2.1-2.1c1.2,0,2.1,0.9,2.1,2.1C42.3,28.7,41.3,29.6,40.2,29.6z M49.3,31c0.3-5.4-1.8-10.6-6-14.4L53,7c6.2,6.6,9.7,15,9.9,24H49.3z"
    }];
    
    var arrow = [{
        fillOk: 'green',
        fillBad: wrong,
        d: "M44.853,42.952h11.031L38.101,60.731L20.324,42.952h11.16C29.908,22.001,18.995,5.075,4.847,0.96 C7.007,0.332,9.243,0,11.529,0C28.812,0,43.037,18.8,44.853,42.952z"
    }];
    
    var arrow2 = [{
        fill: 'dimGrey',
        d:"M41.712,415.346c-11.763,0-21.3-9.537-21.3-21.3V21.299C20.412,9.536,29.949,0,41.712,0l346.122,191.697 c0,0,15.975,15.975,0,31.951C371.859,239.622,41.712,415.346,41.712,415.346z"
    }];

    /**
    * chart
    * Se crean los SVG asociados a cada seccion #vis
    */
    var chart = function (selection) {
        selection.each(function (data3,data7,reliability) {
        
            svg1 = d3.select('#vis1')
                .append('svg')
                .attr('width', 2*width + margin.left + margin.right)
                .attr('height', height/2 + margin.top + margin.bottom);

            g1 = svg1.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            
        
            svg2 = d3.select('#vis2')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height/2 + margin.top + margin.bottom);

            g2 = svg2.append('g')
                .attr('transform', 'translate(' + 0 + ',' + 3*margin.top + ')');

            /*svg3 = d3.select('#vis3')
                .append('svg')
                .attr('width', 2*width + margin.left + margin.right)
                .attr('height', height/2 + margin.top + margin.bottom);

            g3 = svg3.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            svg4 = d3.select('#vis4')
                .append('svg')
                .attr('width', 2*width + margin.left + margin.right)
                .attr('height', height/2 + margin.top + margin.bottom);

            g4 = svg4.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            svg5 = d3.select('#vis5')
                .append('svg')
                .attr('width', 2*width + margin.left + margin.right)
                .attr('height', height/2 + margin.top + margin.bottom);

            g5 = svg5.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            svg6 = d3.select('#vis6')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height/6 + margin.top + margin.bottom);

            g6 = svg6.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');*/

            setupSections();
        });
    };
    
    /**
    * setupSections
    * Cada seccion se activa mediante una funcion. 
    * Aqui es donde se asocia la funcion con el indice
    */ 
    var setupSections = function () {
        // Cada vez que la seccion activa cambia se llama a activateFunctions
        activateFunctions[0] = dontShow;  
        activateFunctions[1] = showSystem;
        activateFunctions[2] = showFail;
        activateFunctions[3] = showModel;
        activateFunctions[4] = showReliability;
        activateFunctions[5] = showMatrix; 
        activateFunctions[6] = showACR;  
        activateFunctions[7] = deleteg;
    };
  
    /**
    * dontShow - Seccion en blanco
    */ 
    function dontShow() {
       g1.remove();    
    };
    
    /**
    * showSystem - Seccion de Sistema y componentes
    */
    function showSystem() {
      
      // Elimina seccion posterior
      g2.remove();
      
      // Se crea el grupo correspondiente
      g1 = svg1.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
      // Transiciones
      var time = 3000
      var delayTime = 500
      
      // Simbolos
      var svgCar = g1
      		.append('path')
            .attr('class', 'system')
            .attr("transform", 'translate(1000,0) scale(1, 1)')
      		.attr("d", car[0].d)
      		.style("fill", car[0].fillOk)
            .transition()
            .duration(time)
            .attr("transform", 'translate(' + 220 + ',0) scale(1, 1)')
            .transition()
                .delay(delayTime)
                .duration(2*delayTime)
            .style("opacity",0.2)
   
      var svgBattery = g1
      		.append('path')
            .attr('class', 'system')
            .attr("transform", 'translate(250,30) scale(1, 1)')
            .attr("opacity",0)
      		.attr("d", battery[0].d)
      		.style("fill", battery[0].fillOk)
            .transition()
                .delay(time+delayTime)
                .duration(2*delayTime)
            .attr("transform", 'translate(' + 210 + ',' +  150 + ') scale(1, 1)')
            .attr("opacity",1)
      
      var svgBrake = g1
      		.append('path')
            .attr('class', 'system')
            .attr("transform", 'translate(250,30) scale(1, 1)')
            .attr("opacity",0)
      		.attr("d", brake[0].d)
      		.style("fill", brake[0].fillOk)
            .transition()
                .delay(time+delayTime)
                .duration(2*delayTime)
            .attr("transform", 'translate(' + (width+90) + ',' +  150 + ') scale(1, 1)')
            .attr("opacity",1)
      
      var svgsparkPlug = g1
      		.append('path')
            .attr('class', 'system')
            .attr("transform", 'translate(250,30) scale(1, 1)')
            .attr("opacity",0)
      		.attr("d", sparkPlug[0].d)
      		.style("fill", sparkPlug[0].fillOk)
            .transition()
                .delay(time+delayTime)
                .duration(2*delayTime)
            .attr("transform", 'translate(' + (width-60) + ',' +  150 + ') scale(1, 1)')
            .attr("opacity",1)
    };

    /**
    * showFail - Seccion Fallo
    *
    */
    function showFail() {
      
        // Elimina los grupos de las secciones anterior y posterior
        g1.remove();
        g3.remove();
  
        // Se crea el grupo correspondiente
        g2 = svg2.append('g')
            .attr('transform', 'translate(' + 0 + ',' + 3*margin.top + ')');
    
        // Transiciones
        var time = 13000
        var delayTime = 1000
      
        // Configuracion de la grafica
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var line = d3.line()
            .curve(d3.curveStepBefore)
            .x(function(d) { return x(d.step); })
            .y(function(d) { return y(d.close); });
      
        // Espacio destinado a los simbolos
        var marginleft = 150;
      
        // Ejes
        var x = d3.scaleLinear().range([0, (width-marginleft)]);
        var y = d3.scaleLinear().range([height/2, 0]);
    
        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y);
      
        // SVG
        var svgContainer = g2;
        var svgSignals = svgContainer.append("g")
                .attr("transform", "translate(" + marginleft + "," + 10 + ")");
        var svgSymbol = svgContainer.append("g")
                .attr("width", marginleft);
      
        // Datos
        color.domain(d3.keys(data3[0]).filter(function(key) { return key !== "step"; }));
        data3.forEach(function(d) {
            d.step = +d.step;
        });
        var signals = color.domain().map(function(name) {
            return {
                name: name,
                values: data3.map(function(d) {
                    return {step: d.step, close: +d[name]};
                })
            };
        });
    
        // Dominio
        x.domain(d3.extent(data3, function(d) { return d.step; }));
        y.domain([
            d3.min(signals, function(c) { return d3.min(c.values, function(v) { return v.close; }); }),
            d3.max(signals, function(c) { return d3.max(c.values, function(v) { return v.close; }); })
        ]);
      
        // Senales
        var signal = svgSignals.selectAll(".signal")
            .data(signals)
   	        .enter()
            .append("g")
            .attr("class", "signal");
   
        var path = svgSignals.selectAll(".signal").append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { if (d.name == "close1") 
                                        {return colorBrake}
                                      else
                                        {if (d.name == "close2")
                                            return colorSparkPlug
                                         else
                                            return colorBattery;} 
                                         })
    
        // Genera el efecto de movimiento en la grafica
        var rect = svgSignals.append('rect')
            .attrs({x:0, y:-3, width:width, height:height/2+5, fill: "white"})
            .transition()
                .delay(delayTime)
                .duration(time)
                .ease(d3.easeLinear)
                .attrs({x:width})

        // Simbolos
        var svgBattery = svgSymbol
      		.append('path')
            .attr("transform", 'translate('+ margin.left/2 + ',' + 0 + ') scale(0.75, 0.75)')
            .attr("opacity",0)
      		.attr("d", battery[0].d)
      		.style("fill", battery[0].fillOk)
            .transition() 
                .duration(delayTime)
                .attr("transform", 'translate('+ marginleft/2 + ',' + margin.top + ') scale(0.75, 0.75)')
                .attr("opacity",1)
            .transition()
                .delay(4.5*time/26)
                .duration(500)
                .style("fill", battery[0].fillBad)
            .transition()
                .style("fill", battery[0].fillOk)
            .transition() 
                .delay(5.5*time/26-300)
                .duration(500)
                .style("fill", battery[0].fillBad)
            .transition()
                .style("fill", battery[0].fillOk)   

        var label1 = svgSymbol
            .append('text')
            .attr('x',170)
            .attr('y',0)
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','12px')
            .attr('fill',wrong)
            .attr("opacity",0)
            .text('avería')
            .transition() 
                .delay(delayTime + 4.2*time/26)
                .duration(250)
                .attr("opacity",1)
 
        var svgArrow1 = svgSymbol
            .append('path')
            .attr("transform", 'translate('+ 215 + ',' + 0 + ') scale(0.30, 0.30)')
            .attr("opacity",0)
      		.attr("d", arrow[0].d)
      		.style("fill", arrow[0].fillBad)
            .transition() 
                .delay(delayTime + 4.2*time/26)
                .duration(250)
                .attr("opacity",1)
      
        var label2 = svgSymbol
            .append('text')
            .attr('x',250)
            .attr('y',0)
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','12px')
            .attr('fill','green')
            .attr("opacity",0)
            .text('reparación')
            .transition() 
                .delay(delayTime + 4.8*time/26)
                .duration(250)
                .attr("opacity",1)
      
        var svgArrow2 = svgSymbol
            .append('path')
            .attr("transform", 'translate('+ 240 + ',' + 20 + ') scale(0.30, 0.30) rotate(220)')
            .attr("opacity",0)
      		.attr("d", arrow[0].d)
      		.style("fill", arrow[0].fillOk)
            .transition() 
                .delay(delayTime + 4.8*time/26)
                .duration(250)
                .attr("opacity",1)

        var svgsparkPlug = svgSymbol
      		.append('path')
            .attr("transform", 'translate('+ marginleft/2 + ',' + 0  + ') scale(0.75, 0.75)')
            .attr("opacity",0)
      		.attr("d", sparkPlug[0].d)
      		.style("fill", sparkPlug[0].fillOk)
            .transition()
                .duration(delayTime)
                .attr("transform", 'translate('+ marginleft/2 + ',' + (height/4-20) + ') scale(0.75, 0.75)')
                .attr("opacity",1)
            .transition()
                .delay(7*time/26)
                .duration(500)
                .style("fill", sparkPlug[0].fillBad)
            .transition()
                .style("fill", sparkPlug[0].fillOk)
      
        var svgBrake = svgSymbol
      		.append('path')
            .attr("transform", 'translate('+ marginleft/2 + ',' + 0 + ') scale(0.75, 0.75)')
            .attr("opacity",0)
      		.attr("d", brake[0].d)
      		.style("fill", brake[0].fillOk)
            .transition()
                .duration(delayTime)
                .attr("transform", 'translate('+ marginleft/2 + ',' + (height/2-40)   + ') scale(0.75, 0.75)')
                .attr("opacity",1)
            .transition()
                .delay(3*time/26)
                .duration(500)
                .style("fill", brake[0].fillBad)
            .transition()
                .style("fill", brake[0].fillOk)
            .transition() 
                .delay(3*time/26)
                .duration(500)
                .style("fill", brake[0].fillBad)
            .transition()
                .style("fill", brake[0].fillOk)
            .transition() 
                .delay(3*time/26)
                .duration(500)
                .style("fill", brake[0].fillBad)
            .transition()
                .style("fill", brake[0].fillOk)
    };
       
    /**
    * showModel - Senales
    *
    */
    function showModel() {
      
        // Elimina los grupos de las secciones anterior y posterior
        g2.remove();
        g4.remove();

        // Se crea el grupo correspondiente
        g3 = svg3.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');  
      
        // Configuracion de la grafica
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var line = d3.line()
            .curve(d3.curveStepBefore)
            .x(function(d) { return x2(d.step); })
            .y(function(d) { return y2(d.close); });
      
        // Espacio destinado a los simbolos
        var symbolsWidth = 110;
      
        // Transiciones
        var delayTime = 800

        // Ejes
        var x2 = d3.scaleLinear().range([0, width-symbolsWidth]);
        var y2 = d3.scaleLinear().range([height/2, 0]);
      
        var xAxis2 = d3.axisBottom(x2);
        var yAxis2 = d3.axisLeft(y2);     
      
        // SVG
        var svgContainer = g3;
      
        var svgSymbol = svgContainer.append("g") 
            .attr("transform", "translate(" + 0 + "," + margin.top + ")")
            .attr("width", width)
            .attr("height", height/2);
      
        var svgSymbol2 = svgContainer.append("g")
            .attr("transform", "translate(" + (width-margin.left)+ "," + margin.top + ")")
            .attr("width", symbolsWidth);
      
        var svgSignals2 = svgContainer.append("g")
            .attr("transform", "translate(" + (width+symbolsWidth-margin.left) + "," + margin.top + ")")
            .attr("width", (width-symbolsWidth))
            .attr("height", height/2);
      
        // Datos
        color.domain(d3.keys(data7[0]).filter(function(key) { return key !== "step"; }));
      
        data7.forEach(function(d) {
            d.step = +d.step;
        });
      
        var signals2 = color.domain().map(function(name) {
            return {
                name: name,
                values: data7.map(function(d) {
                    return {step: d.step, close: +d[name]};
                })
            };
        });
      
        // Dominio
        x2.domain(d3.extent(data7, function(d) { return d.step; }));
        y2.domain([
            d3.min(signals2, function(c) { return d3.min(c.values, function(v) { return v.close; }); }),
            d3.max(signals2, function(c) { return d3.max(c.values, function(v) { return v.close; }); })
        ]);

        //--Diagrama de bloques--//
        
        var svgCar = svgSymbol
      		.append('path')
            .attr("transform", 'translate('+ 1000 + ',' + 0 + ') scale(1.4, 1.4)')
            .attr("opacity",1)
      		.attr("d", car[0].d)
      		.style("fill", car[0].fillOk)
            .transition()
            .duration(3*delayTime)
            .attr("transform", 'translate(' + 0 + ',0) scale(1.4, 1.4)')
            .attr("opacity",0.1)
            .transition() //Fail Brake
                .delay(11*delayTime)
                .duration(delayTime)
                .style("fill", car[0].fillBad)
            .transition()
                .style("fill", car[0].fillOk)
            .transition() //Fail Battery
                .delay(2*delayTime)
                .duration(delayTime)
                .style("fill", car[0].fillBad)
            .transition()
                .style("fill", car[0].fillOk)
            .transition() //Fail all Sparkplug
                .delay(5*delayTime)
                .duration(delayTime)
                .style("fill", car[0].fillBad)
            .transition()
                .style("fill", car[0].fillOk);
      
        var line11 = svgSymbol
            .append('line')
            .attr("x1", 20)
            .attr("y1", height/4.1)
            .attr("x2", 20)
            .attr("y2", height/4.1)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(4*delayTime)
                .duration(delayTime)
                .attr("x2", 65)
                .attr("y2", height/4.1);
      
        var line12 = svgSymbol
            .append('line')
            .attr("x1", 100)
            .attr("y1", height/4.1)
            .attr("x2", 100)
            .attr("y2", height/4.1)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(5*delayTime)
                .duration(delayTime)
                .attr("x2", width/2-60)
                .attr("y2", height/4.1);
      
        var line21 = svgSymbol
            .append('line')
            .attr("opacity",0)
            .attr("x1", width/2-60)
            .attr("y1", height/2.6)
            .attr("x2", width/2-60)
            .attr("y2", height/13.2)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(6*delayTime)
                .duration(delayTime)
                .attr("opacity",1);
      
        var line31 = svgSymbol
            .append('line')
            .attr("x1", width/2-60)
            .attr("y1", height/13.2)
            .attr("x2", width/2-60)
            .attr("y2", height/13.2)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(7*delayTime)
                .duration(delayTime)
                .attr("x2", width/2-14)
                .attr("y2", height/13.2);
      
        var line32 = svgSymbol
            .append('line')
            .attr("x1", width/2-60)
            .attr("y1", height/5.9)
            .attr("x2", width/2-60)
            .attr("y2", height/5.9)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(7*delayTime)
                .duration(delayTime)
                .attr("x2", width/2-14)
                .attr("y2", height/5.9);
      
        var line33 = svgSymbol
            .append('line')
            .attr("x1", width/2-60)
            .attr("y1", height/3.6)
            .attr("x2", width/2-60)
            .attr("y2", height/3.6)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(7*delayTime)
                .duration(delayTime)
                .attr("x2", width/2-14)
                .attr("y2", height/3.6);
      
        var line34 = svgSymbol
            .append('line')
            .attr("x1", width/2-60)
            .attr("y1", height/2.6)
            .attr("x2", width/2-60)
            .attr("y2", height/2.6)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(7*delayTime)
                .duration(delayTime)
                .attr("x2", width/2-14)
                .attr("y2", height/2.6);
   
      
        var line35 = svgSymbol
            .append('line')
            .attr("x1", width/2-4)
            .attr("y1", height/13.2)
            .attr("x2", width/2-4)
            .attr("y2", height/13.2)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(8*delayTime)
                .duration(delayTime)
                .attr("x2", width/2+40)
                .attr("y2", height/13.2);
      
        var line36 = svgSymbol
            .append('line')
            .attr("x1", width/2-4)
            .attr("y1", height/5.9)
            .attr("x2", width/2-4)
            .attr("y2", height/5.9)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(8*delayTime)
                .duration(delayTime)
                .attr("x2", width/2+40)
                .attr("y2", height/5.9);
      
        var line37 = svgSymbol
            .append('line')
            .attr("x1", width/2-4)
            .attr("y1", height/3.6)
            .attr("x2", width/2-4)
            .attr("y2", height/3.6)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(8*delayTime)
                .duration(delayTime)
                .attr("x2",width/2+40)
                .attr("y2", height/3.6);
      
        var line38 = svgSymbol
            .append('line')
            .attr("x1", width/2-4)
            .attr("y1", height/2.6)
            .attr("x2", width/2-4)
            .attr("y2", height/2.6)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(8*delayTime)
                .duration(delayTime)
                .attr("x2", width/2+40)
                .attr("y2", height/2.6);
      
        var line4 = svgSymbol
            .append('line')
            .attr("opacity",0)
            .attr("x1", width/2+40)
            .attr("y1", height/2.6)
            .attr("x2", width/2+40)
            .attr("y2", height/13.2)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(9*delayTime)
                .duration(delayTime)
                .attr("opacity",1);
      
        var line51 = svgSymbol
            .append('line')
            .attr("x1", width/2+40)
            .attr("y1", height/4.1)
            .attr("x2", width/2+40)
            .attr("y2", height/4.1)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(10*delayTime)
                .duration(delayTime/2)
                .attr("x2", width-120)
                .attr("y2", height/4.1);
      
        var line52 = svgSymbol
            .append('line')
            .attr("x1", width-90)
            .attr("y1", height/4.1)
            .attr("x2", width-90)
            .attr("y2", height/4.1)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .transition()
                .delay(11*delayTime)
                .duration(delayTime/2)
                .attr("x2", width-60)
                .attr("y2", height/4.1);
      
        var svgBattery = svgSymbol
      		.append('path')
            .attr("opacity",0)
      		.attr("d", battery[0].d)
      		.style("fill", battery[0].fillOk)
            .transition()
                .delay(3*delayTime)
                .duration(delayTime)
                .attr("transform", 'translate('+ 60 + ',' + height/5 + ') scale(0.7, 0.7)')
                .attr("opacity",1)
            .transition()
                .delay(14*delayTime)
                .duration(delayTime)
                .style("fill", battery[0].fillBad)
            .transition()
                .style("fill", battery[0].fillOk)
      
        var svgsparkPlug1 = svgSymbol
      		.append('path')
            .attr("opacity",0)
      		.attr("d", sparkPlug[0].d)
      		.style("fill", sparkPlug[0].fillOk)
            .transition()
                .delay(3*delayTime)
                .duration(delayTime)
                .attr("transform", 'translate('+ (width/2 -30) + ',' + margin.top  + ') scale(0.7, 0.7)')
                .attr("opacity",1)
            .transition()
                .delay(17*delayTime)
                .duration(delayTime)
                .style("fill", sparkPlug[0].fillBad)
            .transition()
                .style("fill", sparkPlug[0].fillOk)
            .transition() 
                .delay(2*delayTime)
                .duration(delayTime)
                .style("fill", sparkPlug[0].fillBad)
            .transition()
                .style("fill", sparkPlug[0].fillOk)
      
        var svgsparkPlug2 = svgSymbol
      		.append('path')
            .attr("opacity",0)
      		.attr("d", sparkPlug[0].d)
      		.style("fill", sparkPlug[0].fillOk)
            .transition()
                .delay(3*delayTime)
                .duration(delayTime)
                .attr("transform", 'translate('+ (width/2 -30) + ',' + (5.3*margin.top)  + ') scale(0.7, 0.7)')
                .attr("opacity",1)
            .transition() 
                .delay(21*delayTime)
                .duration(delayTime)
                .style("fill", sparkPlug[0].fillBad)
            .transition()
                .style("fill", sparkPlug[0].fillOk)
      
        var svgsparkPlug3 = svgSymbol
      		.append('path')
            .attr("opacity",0)
      		.attr("d", sparkPlug[0].d)
      		.style("fill", sparkPlug[0].fillOk)
            .transition()
                .delay(3*delayTime)
                .duration(delayTime)
                .attr("transform", 'translate('+ (width/2 -30) + ',' + (10*margin.top)  + ') scale(0.7, 0.7)')
                .attr("opacity",1)
            .transition() 
                .delay(21*delayTime)
                .duration(delayTime)
                .style("fill", sparkPlug[0].fillBad)
            .transition()
                .style("fill", sparkPlug[0].fillOk)
      
      
        var svgsparkPlug4 = svgSymbol
      		.append('path')
            .attr("opacity",0)
      		.attr("d", sparkPlug[0].d)
      		.style("fill", sparkPlug[0].fillOk)
            .transition()
                .delay(3*delayTime)
                .duration(delayTime)
                .attr("transform", 'translate('+ (width/2 -30) + ',' + (14.7*margin.top) + ') scale(0.7, 0.7)')
                .attr("opacity",1)
            .transition() 
                .delay(21*delayTime)
                .duration(delayTime)
                .style("fill", sparkPlug[0].fillBad)
            .transition()
                .style("fill", sparkPlug[0].fillOk)

        var svgBrake = svgSymbol
      		.append('path')
            .attr("opacity",0)
      		.attr("d", brake[0].d)
      		.style("fill", brake[0].fillOk)
            .transition()
                .delay(3*delayTime)
                .duration(delayTime)
                .attr("transform", 'translate('+ (width-130) + ',' + height/5 + ')scale(0.7, 0.7)')
                .attr("opacity",1)
            .transition()
                .delay(10*delayTime)
                .duration(delayTime)
                .style("fill", brake[0].fillBad)
            .transition()
                .style("fill", brake[0].fillOk)
      
        // Senales
        var signal = svgSignals2.selectAll(".signal2")
            .data(signals2)
   	        .enter().append("g")
            .attr("class", "signal2");
      
        var path = svgSignals2.selectAll(".signal2").append("path")
            .transition()
            .delay(3*delayTime)
            .duration(delayTime)
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function (d) { switch(d.name) {
                                            case "close7": 
                                                {return "dimGrey"};
                                            case "close6": 
                                                {return colorBattery};
                                            case "close5": 
                                                {return colorSparkPlug};
                                            case "close4": 
                                                {return colorSparkPlug};
                                            case "close3": 
                                                {return colorSparkPlug};
                                            case "close2": 
                                                {return colorSparkPlug};
                                            case "close1": 
                                                {return colorBrake};
                                            }
                                          }
            )
        
        // Genera el efecto de movimiento en la grafica
        var rect = svgSignals2.append('rect')
            .transition()
                .delay(2*delayTime)
                .duration(delayTime)
                .attrs({x:-2, y:-4, width:width, height:height/2+25, fill: "white"})
            .transition()
                .delay(10*delayTime)
                .duration(20*delayTime)
                .ease(d3.easeLinear)
                .attrs({x:width})
        
        // Simbolos
        var svgCar2 = svgSymbol2
      		.append('path')
            .attr("transform", 'translate('+ symbolsWidth/2 + ',' +(height/2-225) + ') scale(0.16, 0.16)')
      		.attr("d", car[0].d)
      		.style("fill", car[0].fillOk)
            .attr("opacity",0)
            .transition() 
                .delay(12*delayTime)
                .duration(delayTime)
                .attr("opacity",1)
            .transition() //Fail Brake
                .delay(delayTime)
                .duration(delayTime)
                .style("fill", car[0].fillBad)
            .transition()
                .style("fill", car[0].fillOk)
            .transition() //Fail Battery
                .delay(2*delayTime)
                .duration(delayTime)
                .style("fill", car[0].fillBad)
            .transition()
                .style("fill", car[0].fillOk)
            .transition() //Fail all Sparkplug
                .delay(5*delayTime)
                .duration(delayTime)
                .style("fill", car[0].fillBad)
            .transition()
                .style("fill", car[0].fillOk);
        
        var svgBattery2 = svgSymbol2
      		.append('path')
            .attr("transform", 'translate('+(symbolsWidth/2+5) + ',' +(height/2-195) + ') scale(0.5, 0.5)')
      		.attr("d", battery[0].d)
      		.style("fill", battery[0].fillOk)
            .attr("opacity",0)
            .transition() 
                .delay(12*delayTime)
                .duration(delayTime)
                .attr("opacity",1)
            .transition()
                .delay(5*delayTime)
                .duration(delayTime)
                .style("fill", battery[0].fillBad)
            .transition()
                .style("fill", battery[0].fillOk)

        var svgsparkPlug21 = svgSymbol2
      		.append('path')
            .attr("transform", 'translate('+ (symbolsWidth/2+8) + ',' + (height/2-160) + ') scale(0.4, 0.4)')
      		.attr("d", sparkPlug[0].d)
      		.style("fill", sparkPlug[0].fillOk)
            .attr("opacity",0)
            .transition()
                .delay(12*delayTime)
                .duration(delayTime)
                .attr("opacity",1)
            .transition()
                .delay(8*delayTime)
                .duration(delayTime)
                .style("fill", sparkPlug[0].fillBad)
            .transition()
                .style("fill", sparkPlug[0].fillOk)
            .transition() 
                .delay(2*delayTime)
                .duration(delayTime)
                .style("fill", sparkPlug[0].fillBad)
            .transition()
                .style("fill", sparkPlug[0].fillOk)
      
        var svgsparkPlug22 = svgSymbol2
      		.append('path')
            .attr("transform", 'translate('+ (symbolsWidth/2+8) + ',' + (height/2-125) + ') scale(0.4, 0.4)')
      		.attr("d", sparkPlug[0].d)
      		.style("fill", sparkPlug[0].fillOk)
            .attr("opacity",0)
            .transition() 
                .delay(12*delayTime)
                .duration(delayTime)
                .attr("opacity",1)
            .transition() 
                .delay(12*delayTime)
                .duration(delayTime)
                .style("fill", sparkPlug[0].fillBad)
            .transition()
                .style("fill", sparkPlug[0].fillOk)
       
        var svgsparkPlug23 = svgSymbol2
      		.append('path')
            .attr("transform", 'translate('+ (symbolsWidth/2+8) + ',' + (height/2-90) + ') scale(0.4, 0.4)')
      		.attr("d", sparkPlug[0].d)
      		.style("fill", sparkPlug[0].fillOk)
            .attr("opacity",0)
            .transition() 
                .delay(12*delayTime)
                .duration(delayTime)
                .attr("opacity",1)
            .transition() 
                .delay(12*delayTime)
                .duration(delayTime)
                .style("fill", sparkPlug[0].fillBad)
            .transition()
                .style("fill", sparkPlug[0].fillOk)
        
        var svgsparkPlug24 = svgSymbol2
      		.append('path')
            .attr("transform", 'translate('+ (symbolsWidth/2+8) + ',' + (height/2-55) + ') scale(0.4, 0.4)')
      		.attr("d", sparkPlug[0].d)
      		.style("fill", sparkPlug[0].fillOk)
            .attr("opacity",0)
            .transition()
                .delay(12*delayTime)
                .duration(delayTime)
                .attr("opacity",1)
            .transition() 
                .delay(12*delayTime)
                .duration(delayTime)
                .style("fill", sparkPlug[0].fillBad)
            .transition()
                .style("fill", sparkPlug[0].fillOk)
 
        var svgBrake2 = svgSymbol2
      		.append('path')
            .attr("transform", 'translate('+ (symbolsWidth/2+4) + ',' + (height/2-25)   + ') scale(0.5, 0.5)')
      		.attr("d", brake[0].d)
      		.style("fill", brake[0].fillOk)
            .attr("opacity",0)
            .transition()
                .delay(12*delayTime)
                .duration(delayTime)
                .attr("opacity",1)
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .style("fill", brake[0].fillBad)
            .transition()
                .style("fill", brake[0].fillOk)
    };

    /**
    * showReliability - show signals
    */
    function showReliability() {
        
        // Elimina los grupos de las secciones anterior y posterior
        g3.remove();
        g5.remove();

        // Se crea el grupo correspondiente
        g4 = svg4.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);
   
        // Transiciones
        var duracion = 6000
        var delayTime = 2000
        var transition = d3.transition();
    
        // Configuracion de la grafica
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        // Ejes
        var xReliability = d3.scaleLinear().range([0,(width-margin.left)]);
        var yReliability = d3.scaleLinear().range([height/2, 0]);

        var xAxisReliability = d3.axisBottom(xReliability).ticks(6);
        var yAxisReliability = d3.axisLeft(yReliability);

        //--Diagrama de bloques--//
        
        // SVG
        var svgBloques = g4.append('g')
            .attr('transform', 'translate(' + -margin.left + ',' + (margin.top + 10) + ')')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height/2 + margin.top + margin.bottom);
        
        var line1 = svgBloques
            .append('line')
            .attr("x1",0)
            .attr("y1", 37)
            .attr("x2", 45)
            .attr("y2", 37)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
     
        var bloque1= svgBloques
            .append('rect')
            .attr('x',45)
            .attr('y',0)
            .attr('width',75)
            .attr('height',75)
            .style('fill','none')
            .attr("stroke-width", 1.5)
            .attr("stroke", colorBattery)
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
                    
        var label1= svgBloques
            .append('text')
            .attr('x', 82)
            .attr('y', 37)
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','30px')
            .text("\u03BB")
            .attr('fill',colorBattery)
            .attr("text-anchor","middle")
            .attr("dominant-baseline","central")
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
   
        var label1sub = svgBloques
            .append('path')
            .attr("transform", 'translate('+ 90 + ',' + 45 + ') scale(0.4, 0.4)')
      		.attr("d", battery[0].d)
      		.style("fill", battery[0].fillOk)
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);

        var line2 = svgBloques
            .append('line')
            .attr("x1",120)
            .attr("y1", 37)
            .attr("x2", 174)
            .attr("y2", 37)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
    
        var bloque2 = svgBloques
            .append('rect')
            .attr('x',174)
            .attr('y',0)
            .attr('width',75)
            .attr('height',75)
            .style('fill','none')
            .attr("stroke-width", 1.5)
            .attr("stroke", colorSparkPlug)
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
   
        var label2= svgBloques
            .append('text')
            .attr('x', 211)
            .attr('y', 37)
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','30px')
            .text("\u03BB")
            .attr('fill',colorSparkPlug)
            .attr("text-anchor","middle")
            .attr("dominant-baseline","central")
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
    
        var label2subtext = svgBloques
            .append('text')
            .attr('x',219)
            .attr('y',60)
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','12px')
            .attr('fill',colorSparkPlug)
            .text('4x')
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
                    
        var label2sub = svgBloques.append('path')
            .attr("transform", 'translate('+ 225 + ',' + 45 + ') scale(0.4, 0.4)')
      		.attr("d", sparkPlug[0].d)
      		.style("fill", sparkPlug[0].fillOk)
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
    
        var line3 = svgBloques
            .append('line')
            .attr("x1",249)
            .attr("y1", 37)
            .attr("x2", 303)
            .attr("y2", 37)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
    
        var bloque3 = svgBloques
            .append('rect')
            .attr('x',303)
            .attr('y',0)
            .attr('width',75)
            .attr('height',75)
            .style('fill','none')
            .attr("stroke-width", 1.5)
            .attr("stroke", colorBrake)
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
   
        var label3= svgBloques
            .append('text')
            .attr('x', 341)
            .attr('y', 37)
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','30px')
            .text("\u03BB")
            .attr('fill',colorBrake)
            .attr("text-anchor","middle")
            .attr("dominant-baseline","central")
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
    
        var label3sub = svgBloques
            .append('path')
            .attr("transform", 'translate('+ 349 + ',' + 45 + ') scale(0.4, 0.4)')
      		.attr("d", brake[0].d)
      		.style("fill", brake[0].fillOk)
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
   
        var line4 = svgBloques
            .append('line')
            .attr("x1",378)
            .attr("y1", 37)
            .attr("x2", 423)
            .attr("y2", 37)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
   
        var bloque4 = svgBloques
            .append('rect')
            .attr('x',25)
            .attr('y',-10)
            .attr('width',373)
            .attr('height',115)
            .style('fill','none')
            .attr("stroke-width", 2.5)
            .attr("stroke", "dimGrey")
            .attr("opacity",0)
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .attr("opacity",1);
    
        var label4= svgBloques
            .append('text')
            .attr('x', 341)
            .attr('y', 90)
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','25px')
            .text("\u03BB")
            .attr('fill','dimGrey')
            .attr("text-anchor","middle")
            .attr("dominant-baseline","central")
            .attr("opacity",0)
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .attr("opacity",1);
    
        var label4sub = svgBloques
            .append('path')
            .attr("transform", 'translate('+ 350 + ',' + 85 + ') scale(0.13, 0.13)')
      		.attr("d", car[0].d)
      		.style("fill", car[0].fillOk)
            .attr("opacity",0)
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .attr("opacity",1);
        
        //--Simbolos y Senales--//
        
        // SVG
        var svgContainer = g4.append('g')
            .attr('transform', 'translate(' + width + ',' + 0 + ')')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height/2 + margin.top + margin.bottom);
      
        var tooltip = svgContainer.append("text")
            .attr("transform", "translate(" + 150 + ", " + 150 + ")")
            .style("opacity", 0);
      
        var svgSignalsReliability = svgContainer.append("g");

        // Configuracion de la grafica
        color.domain(d3.keys(reliability[0]).filter(function(key) { return key !== "step"; }));
        var plotLine = d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {
                return xReliability(d.step);
            })
            .y(function(d) {
                return yReliability(d.close);
            });
  
        //Datos
        reliability.forEach(function(d) {
            d.step = +d.step;
        });

        var signals = color.domain().map(function(name) {
            return {
                name: name,
                values: reliability.map(function(d) {
                    return {step: d.step, close: +d[name]};
                })
            };
        });

        // Dominio
        xReliability.domain(d3.extent(reliability, function(d) { return d.step; }));
        yReliability.domain([
            d3.min(signals, function(c) { return d3.min(c.values, function(v) { return v.close; }); }),
            d3.max(signals, function(c) { return d3.max(c.values, function(v) { return v.close; }); })
  	     ]);

        // Ejes
        svgSignalsReliability.append("g")
            .attr("transform", "translate(" + 0 + ", " + (0 + height/2) + ")")
            .attr("opacity",0)
            .transition()
                .delay(1.5*delayTime)
                .duration(delayTime/2)
                .attr("opacity",1)
                .attr("class", "axisColor")
                .call(xAxisReliability); 
    
        svgSignalsReliability.append("g")
            .attr("transform","translate(" + 0 + "," + 0 + ")")
            .attr("opacity",0)
            .transition()
                .delay(1.5*delayTime)
                .duration(delayTime/2)
                .attr("opacity",1)
                .attr("class", "axisColor") 
                .call(yAxisReliability);

        // Senales 
        var signal = svgSignalsReliability.selectAll(".signalReliability")
            .data(signals)
   	        .enter().append("g")
            .attr("class", "signalReliability");
        
        // Simbolos
        var path = svgSignalsReliability.selectAll(".signalReliability").append("path")
            .attr("class", "line")
            .attr("d", function(d) { return plotLine(d.values); })
            .attr("opacity",0)
            .style("stroke", function(d) { switch(d.name) {
                                        case "close4": 
                                            {return "dimGrey"};
                                        case "close3": 
                                            {return colorSparkPlug};
                                        case "close2": 
                                            {return colorBrake};
                                        case "close1": 
                                            {return colorBattery};
              
                                        }});
    
        // Genera el efecto de movimiento en la grafica
        var totalLength = path.node().getTotalLength();
    
        path
            .attr("stroke-dasharray", (totalLength + 80) + " " + totalLength ) 
            .attr("stroke-dashoffset", totalLength)
            .transition()
                .delay(1.5*delayTime)
                .duration(duracion)
                .attr("opacity",1)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)
    
        // Etiques
        path   
            .on("mouseover", function(d){
                switch(d.name) {
                    case "close4": 
                        element="Vehículo";
                        colorelement="dimGrey";
                        break;
                    case "close3": 
                        element="Bujías";
                        colorelement=colorSparkPlug;
                        break;
                    case "close2": 
                        element="Freno";
                        colorelement=colorBrake;
                        break;
                    case "close1": 
                        element="Batería";
                        colorelement=colorBattery;
                         break;
                };
                tooltip.transition()
                    .duration(0)
                    .style("opacity", 1);
                tooltip.text(element)
                    .style("fill",colorelement)
                    .style("font-size","16px")
		  })
		  .on("mouseout", function(d){
                tooltip.transition()
				    .duration(1000)
				    .style("opacity",0)
		  });
      
        // Titulo
        svgSignalsReliability.append("text")
            .attr("transform","translate(" + -40 + "," + -40 + ")")
            .attr('x', width / 3)
            .attr('y', (height / 5))
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','16px')
            .text("Fiabilidad vs Tiempo (meses)")
            .attr("opacity",0)
            .transition()
                .delay(1.5*delayTime)
                .duration(delayTime/2)
                .attr("opacity",1);
    
        // Subtitulo
        svgSignalsReliability.append("text")
            .attr("transform","translate(" + -40 + "," + -20 + ")")
            .attr('x', width / 3)
            .attr('y', (height / 5))
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','10px')
            .text("Datos simulados")
            .attr("opacity",0)
            .transition()
                .delay(1.5*delayTime)
                .duration(delayTime/2)
                .attr("opacity",1);
    };
    
    /**
    * showMatrix - Riesgo y Matriz de Riesgo
    */
    function showMatrix() {
        
        // Elimina los grupos de las secciones anterior y posterior
        g4.remove();
        g6.remove();
      
        // Se crea el grupo correspondiente
        g5 = svg5.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      
        var svgMatriz = g5
    
        // Transiciones
        var time = 13000
        var delayTime = 1000
   
        //--Grafica de Riesgo--//
    
        // Ejes
        svgMatriz.append('line')
            .attr("x1",(30))
            .attr("y1", 203)
            .attr("x2",(211))
            .attr("y2", 203)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);  
    
        svgMatriz.append('path')
            .attr("transform", 'translate('+ (210)+ ',' + 195 + ') scale(0.04, 0.04)')
      		.attr("d", arrow2[0].d)
      		.style("fill", arrow2[0].fill)
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
      
        svgMatriz.append('line')
            .attr("x1",(30))
            .attr("y1", 21)
            .attr("x2",(30))
            .attr("y2", 203)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);  
      
        svgMatriz.append('path')
            .attr("transform", 'translate('+ (22) + ',' + 23 + ') scale(0.04, 0.04) rotate(270)')
      		.attr("d", arrow2[0].d)
      		.style("fill", arrow2[0].fill)
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
      
        // Textos ejes
        svgMatriz.append('text')
            .transition()
            .duration(delayTime)
            .attr('x', (80))
            .attr('y', 220)
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','14px')
            .text("Impacto")
            .attr('fill',"dimGrey")
    
        svgMatriz.append('text')
            .transition()
            .duration(delayTime)
            .attr("transform", "translate ("+ (23) + ", 160) rotate(270)")
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','14px')
            .text("Probabilidad")
            .attr('fill',"dimGrey")
     
        // Area de riesgo
        svgMatriz.append('rect')
            .attr('width',155)
            .attr('height',155)
            .attr('x', 30)
            .attr('y', 47)
            .style('fill', '#309191')
            .style('opacity',0)
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .style('opacity',0.7)
      
        svgMatriz.append('path')
            .attr("transform", 'translate('+ (170) + ',' + 60 + ') scale(0.6, 0.6) rotate(3150)')
      		.attr("d", arrow[0].d)
      		.style("fill", 'dimGrey')
            .attr("opacity",0)
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .attr("opacity",1);
      
        svgMatriz.append('text')
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .attr('x', 215)
                .attr('y', 43)
                .attr('font-family','Atlas Grotesk Web')
                .attr('font-size','16px')
                .text("Riesgo")
                .attr('fill',"dimGrey")
        
        //---Matriz de Riesgo---//
    
        //Ejes
        svgMatriz.append('line')
            .attr("x1",(width+ 30))
            .attr("y1", 203)
            .attr("x2",(width+ 211))
            .attr("y2", 203)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);  
    
        svgMatriz.append('path')
            .attr("transform", 'translate('+ (width+ 210)+ ',' + 195 + ') scale(0.04, 0.04)')
      		.attr("d", arrow2[0].d)
      		.style("fill", arrow2[0].fill)
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
      
        svgMatriz.append('line')
            .attr("x1",(width+ 30))
            .attr("y1", 21)
            .attr("x2",(width+ 30))
            .attr("y2", 203)
            .attr("stroke-width", 1.5)
            .attr("stroke", "DimGrey")
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);  
      
        svgMatriz.append('path')
            .attr("transform", 'translate('+ (width+ 22) + ',' + 23 + ') scale(0.04, 0.04) rotate(270)')
      		.attr("d", arrow2[0].d)
      		.style("fill", arrow2[0].fill)
            .attr("opacity",0)
            .transition()
                .duration(delayTime)
                .attr("opacity",1);
      
        // Titulo
        svgMatriz.append('text')
            .transition()
            .duration(delayTime)
                .attr('x', (width+ 55))
                .attr('y', 10)
                .attr('font-family','Atlas Grotesk Web')
                .attr('font-size','16px')
                .text("Matriz de Riesgo")
                .attr('fill',"dimGrey")
        
        //Textos ejes
        svgMatriz.append('text')
            .transition()
                .duration(delayTime)
                .attr('x', (width+ 80))
                .attr('y', 220)
                .attr('font-family','Atlas Grotesk Web')
                .attr('font-size','14px')
                .text("Impacto")
                .attr('fill',"dimGrey")
    
        svgMatriz.append('text')
            .transition()
                .duration(delayTime)
                .attr("transform", "translate ("+ (width+ 23) + ", 160) rotate(270)")
                .attr('font-family','Atlas Grotesk Web')
                .attr('font-size','14px')
                .text("Probabilidad")
                .attr('fill',"dimGrey")
        
        // Datos
        svgMatriz.append('g')
            .attr('transform', 'translate(' + (width) + ',' + 0 + ')')
            .selectAll('rect')
            .data(matrizblanco)
            .enter()
            .append('rect')
            .attr('width',35)
            .attr('height',35)
            .attr('x', function (d) {return d.columna*40})
            .attr('y',function (d) {return d.fila*40})
            .style('fill', function (d) {return d.color})
            .style('opacity',0)
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .style('opacity',1)
      
        svgMatriz.append('path')
            .attr("transform", 'translate('+ (width+180) + ',' + 50 + ') scale(0.5, 0.5) rotate(3150)')
      		.attr("d", arrow[0].d)
      		.style("fill", 'dimGrey')
            .attr("opacity",0)
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .attr("opacity",1);
      
        svgMatriz.append('text')
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .attr('x', (width + 215))
                .attr('y', 35)
                .attr('font-family','Atlas Grotesk Web')
                .attr('font-size','16px')
                .text("Índice de Riesgo")
                .attr('fill',"dimGrey")
      
        // Leyenda  
        svgMatriz.append('rect')
            .attr('width',35)
            .attr('height',35)
            .attr('x', 680 )
            .attr('y', 60)
            .style('fill', '#E94F53')
            .style('opacity',0)
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .style('opacity',1)
      
        svgMatriz.append('text')
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .attr("transform", "translate ("+ 730 + ", 85)")
                .attr('font-family','Atlas Grotesk Web')
                .attr('font-size','14px')
                .text("Riesgo alto")
                .attr('fill',"dimGrey")
      
        svgMatriz.append('rect')
            .attr('width',35)
            .attr('height',35)
            .attr('x', 680 )
            .attr('y', 100)
            .style('fill', '#F9D422')
            .style('opacity',0)
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .style('opacity',1)
      
        svgMatriz.append('text')
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .attr("transform", "translate ("+ 730 + ", 125)")
                .attr('font-family','Atlas Grotesk Web')
                .attr('font-size','14px')
                .text("Riesgo medio")
                .attr('fill',"dimGrey")
      
        svgMatriz.append('rect')
            .attr('width',35)
            .attr('height',35)
            .attr('x', 680 )
            .attr('y', 140)
            .style('fill', '#6FA84B')
            .style('opacity',0)
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .style('opacity',1)
      
        svgMatriz.append('text')
            .transition()
                .delay(delayTime)
                .duration(delayTime)
                .attr("transform", "translate ("+ 730 + ", 165)")
                .attr('font-family','Atlas Grotesk Web')
                .attr('font-size','14px')
                .text("Riesgo bajo")
                .attr('fill',"dimGrey")
    };
    
    /**
    * showACR - Analisis Causa Raiz
    */
    function showACR() {
        
        // Elimina los grupos de las secciones anterior y posterior
        g5.remove();
        g6.remove();
        
        // Se crea el grupo correspondiente
        g6 = svg6.append('g')
            .attr('transform', 'translate(' + 0 + ',' + 0 + ')'); 
      
        // Transiciones
        var time = 13000
        var delayTime = 1000
      
        // Configuracion de la grafica 
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var line = d3.line()
            .curve(d3.curveStepBefore)
            .x(function(d) { return x(d.step); })
            .y(function(d) { return y(d.close); });
        
        // Espacio destinado a los símbolos
        var marginleft = 150;
      
        // Ejes
        var x = d3.scaleLinear().range([0, (width-marginleft)]);
        var y = d3.scaleLinear().range([height/8, 0]);
    
        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y);
      
        // SVG
        var svgContainer = g6;
        var svgSignals = svgContainer.append("g")
            .attr("transform", "translate(" + marginleft + "," + 50 + ")")
            .attr('height', height/4);
        var svgSymbol = svgContainer.append("g")
            .attr("width", marginleft);
        
        // Datos
        color.domain(d3.keys(data3[0]).filter(function(key) { return key !== "step"; }));
        data3.forEach(function(d) {
            d.step = +d.step;
        });
        var signals = color.domain().map(function(name) {
            return {
                name: name,
                values: data3.map(function(d) {
                    return {step: d.step, close: +d.close1};
                })
            };
        });
    
        // Dominio
        x.domain(d3.extent(data3, function(d) { return d.step; }));
        y.domain([
            d3.min(signals, function(c) { return d3.min(c.values, function(v) { return v.close; }); }),
            d3.max(signals, function(c) { return d3.max(c.values, function(v) { return v.close; }); })
  	     ]);
      
        // Senales
        var signal = svgSignals.selectAll(".signal")
            .data(signals)
   	        .enter().append("g")
            .attr("class", "signal");
        var path = svgSignals.selectAll(".signal").append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", colorBrake);

        // Genera el efecto de movimiento en la grafica
        var rect = svgSignals.append('rect')
            .attrs({x:0, y:-3, width:width, height:height/6, fill: "white"})
            .transition()
                .delay(delayTime)
                .duration(time)
                .ease(d3.easeLinear)
                .attrs({x:width})

        // Symbols
        var svgBrake = svgSymbol
      		.append('path')
            .attr("transform", 'translate('+ marginleft/2 + ',' + 0 + ') scale(0.75, 0.75)')
            .attr("opacity",0)
      		.attr("d", brake[0].d)
      		.style("fill", brake[0].fillOk)
            .transition()
            .duration(delayTime)
            .attr("transform", 'translate('+ marginleft/2 + ',' + (height/4-50)   + ') scale(0.75, 0.75)')
            .attr("opacity",1)
            .transition()
                .delay(3*time/26)
                .duration(500)
                .style("fill", brake[0].fillBad)
            .transition()
                .style("fill", brake[0].fillOk)
            .transition() 
                .delay(3*time/26)
                .duration(500)
                .style("fill", brake[0].fillBad)
            .transition()
                .style("fill", brake[0].fillOk)
            .transition() 
                .delay(3*time/26)
                .duration(500)
                .style("fill", brake[0].fillBad)
            .transition()
                .style("fill", brake[0].fillOk)
        
        var label1 = svgSymbol
            .append('text')
            .attr('x',170)
            .attr('y',30)
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','12px')
            .attr('fill',wrong)
            .attr("opacity",0)
            .text('Pastillas')
            .transition() 
                .delay(delayTime + 3*time/26)
                .duration(250)
                .attr("opacity",1)
                  
      
        var svgArrow1 = svgSymbol
            .append('path')
            .attr("transform", 'translate('+ 195 + ',' + 35 + ') scale(0.30, 0.30)')
            .attr("opacity",0)
      		.attr("d", arrow[0].d)
      		.style("fill", arrow[0].fillBad)
            .transition() 
                .delay(delayTime + 3*time/26)
                .duration(250)
                .attr("opacity",1)
      
        var label2 = svgSymbol
            .append('text')
            .attr('x',270)
            .attr('y',30)
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','12px')
            .attr('fill',wrong)
            .attr("opacity",0)
            .text('Discos')
            .transition() 
                .delay(delayTime+ 950 + 6*time/26)
                .duration(250)
                .attr("opacity",1)

        var svgArrow2 = svgSymbol
            .append('path')
            .attr("transform", 'translate('+ 289 + ',' + 35 + ') scale(0.30, 0.30)')
            .attr("opacity",0)
      		.attr("d", arrow[0].d)
      		.style("fill", arrow[0].fillBad)
            .transition() 
                .delay(delayTime+ 950 + 6*time/26)
                .duration(250)
                .attr("opacity",1)
      
        var label3 = svgSymbol
            .append('text')
            .attr('x',350)
            .attr('y',30)
            .attr('font-family','Atlas Grotesk Web')
            .attr('font-size','12px')
            .attr('fill',wrong)
            .attr("opacity",0)
            .text('Líquido frenos')
            .transition() 
                .delay(delayTime+ 1900 + 9*time/26)
                .duration(250)
                .attr("opacity",1)

        var svgArrow3 = svgSymbol
            .append('path')
            .attr("transform", 'translate('+ 369 + ',' + 35 + ') scale(0.30, 0.30)')
            .attr("opacity",0)
      		.attr("d", arrow[0].d)
      		.style("fill", arrow[0].fillBad)
            .transition() 
                .delay(delayTime+ 1900 + 9*time/26)
                .duration(250)
                .attr("opacity",1) 
    };
    
    /**
    * deleteg - Borra el grupo de la ultima seccion
    */    
    function deleteg() {
        g6.remove();
    };

    /**
    * activate - Activa cada funcion segun el indice
    */
    chart.activate = function (index) {
        activeIndex = index;
        var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
        var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
        scrolledSections.forEach(function (i) {
            activateFunctions[i]();
        });
        lastIndex = activeIndex;
  };

  return chart;
};

//////////////////////////////////////////////////////////////////////////
// display
// Se llama cuando se han cargado los datos
//////////////////////////////////////////////////////////////////////////

function display(data3, data7, realiability, matrizblanco) {
    
    // Se llama a la funcion scrollVis que es la encargada de generar los graficos de
    
    var plot = scrollVis(data3, data7, realiability, matrizblanco);
    d3.select('#vis1')
        .call(plot);

    // Configuracion del scroller
    
    var scroll = scroller()
        .container(d3.select('#graphic'));

    scroll(d3.selectAll('.step'));

    scroll.on('active', function (index) {
        d3.selectAll('.step')
            .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });
        plot.activate(index);      
    });   
}

//////////////////////////////////////////////////////////////////////////
// visdashboard
// Se llama cuando se han cargado los datos
//////////////////////////////////////////////////////////////////////////

function visdashboard(acr, matriz, report) {
    
    var width = 230;
    var height = 230;
   
    //--Matriz de Criticidad--//
    
    var svg11 = d3.select('#matrixgraph')
            .append('svg')
            .attr('width', width)
            .attr('height', height);
   
   // Creacion de la matriz segun datos 
   svg11.append('g')
        .selectAll('rect')
        .data(matriz)
        .enter()
        .append('rect')
        .attr('width',30)
        .attr('height',30)
        .attr('x', function (d) {return d.columna*35})
        .attr('y',function (d) {return d.fila*35})
        .style('fill', function (d) {return d.color})
        
    svg11.append('g')
        .attr("transform", "translate(15,15)")
        .selectAll('text')
        .data(matriz)
        .enter()
        .append('text')
        .attr('x', function (d) {return d.columna*35})
        .attr('y',function (d) {return d.fila*35})
        .text(function(d) {return d.valor})
        .attr("text-anchor","middle")
        .attr("dominant-baseline","central")
    
    // Titulo
    svg11.append('text')
        .attr('x', 47)
        .attr('y', 15)
        .attr('font-family','Atlas Grotesk Web')
        .attr('font-size','18px')
        .text("Matriz de Riesgo")
        .attr('fill',"dimGrey")
    
    // Etiquetas ejes
    svg11.append('text')
        .attr('x', 90)
        .attr('y', 225)
        .attr('font-family','Atlas Grotesk Web')
        .attr('font-size','14px')
        .text("Impacto")
        .attr('fill',"dimGrey")
    
    svg11.append('text')
        .attr("transform", "translate (25, 160) rotate(270)")
        .attr('font-family','Atlas Grotesk Web')
        .attr('font-size','14px')
        .text("Probabilidad")
        .attr('fill',"dimGrey")

    //--Elementos creados con DC.js--//
    
    // Datos
    acr.forEach(function (d) {
        d.costeReparacion = +d.costeReparacion;
        d.costePerdidaProduccion = +d.costePerdidaProduccion; 
        d.impacto = +d.impacto;
    });
    
    // Alimentar el Crossfilter
    var ndx = crossfilter(acr);
    var table = crossfilter(acr);
    var tableReport = crossfilter(report);
    
    // Definir los grupos para contar
    var all = ndx.groupAll();
    var totalInst = ndx.groupAll().value();

    // Dimensiones
    var probDimension = ndx.dimension(function(d) { return +d.probabilidad; });    
    var criDimension = ndx.dimension(function(d) { return +d.riesgo; });  
    var bubbleDimension = ndx.dimension(function(d) { return d.causaRaiz; });
    var cosDimension = ndx.dimension(function(d) { return +d.coste; }); 
    var horDimension = ndx.dimension(function(d) { return +d.horasHombre; }); 
    var pieDimension = ndx.dimension(function(d) { return d.causaRaiz; }); 
    var allDim = table.dimension(function(d) {return d;});
    var allTableReport = tableReport.dimension(function(d) {return d;});
    
    // Grupos
    var critTotal = ndx.groupAll().reduceSum(function(d) { return +d.riesgo; });
    var critTotalValue = ndx.groupAll().reduceSum(function(d) { return d.riesgo; }).value();
    var criGroupTotal = criDimension.group().reduceSum(function(d) {return +d.riesgo;});
    var criGroup =criDimension.group().reduceCount();
    
    var criDimensionPie = ndx.dimension(function(d) { return d.riesgo; });
    var criGroupAllPie = criDimensionPie.groupAll().reduceSum(function(d) { return +d.riesgo; });
    
    var probTotal = ndx.groupAll().reduceSum(function(d) { return d.probabilidad; });
    var probTotalValue = ndx.groupAll().reduceSum(function(d) { return d.probabilidad; }).value();
    var probGroupTotal = probDimension.group().reduceSum(function(d) {return +d.probabilidad;});
    var probGroup =probDimension.group().reduceCount();
    
    var probDimensionPie = ndx.dimension(function(d) { return d.probabilidad; });
    var probGroupAllPie = criDimensionPie.groupAll().reduceSum(function(d) { return +d.probabilidad; });
    
    var cosTotal = ndx.groupAll().reduceSum(function(d) { return +d.coste; });
    var horTotal = ndx.groupAll().reduceSum(function(d) { return +d.mesesHombre; });
    
    var bubbleGroup = bubbleDimension.group().reduce(
        function(p, v) {
            ++p.count
            p.causaraiz = v.causaraiz;
            p.probabilidad = v.probabilidad;
            p.costePerdidaProduccion = v.costePerdidaProduccion;
            p.costeReparacion = v.costeReparacion;
            p.impacto =v.impacto;
            p.riesgo = v.riesgo;
            p.probabilidad= v.probabilidad;
            p.codigo = v.codigo;
            p.coste = v.coste;
            p.mesesHombre = v.mesesHombre;
            return p;
        },
        function(p, v) {
            --p.count
            p.probabilidad = 0;
            p.causaraiz = "";
            p.costePerdidaProduccion = 0;
            p.costeReparacion = 0;
            p.impacto =0;
            p.riesgo = 0;
            p.probabilidad= 0;
            return p;
        },
        function() {
            return { count: 0, costePerdidaProduccion: 0, costeReparacion:0, causaraiz: "", probabilidad: 0, impacto: 0, riesgo:0 };
    });

    var pieGroup = pieDimension.group().reduce(
        function(p, v) {
            ++p.count
             p.clave="OK"
             p.causaraiz = v.causaraiz;
             p.riesgo += +v.riesgo;
             return p;
        },
        function(p, v) {
            --p.count
            p.clave="N0"
            p.causaraiz = "";
            p.riesgo -= +v.riesgo;
            return p;
        },
        function() {
            return { count: 0, riesgo:0, causaraiz: "", clave:1 };
    });
    
    function portion_group(groupAll, includeKey, excludeKey) {
      includeKey = includeKey || "Mejora";
      excludeKey = excludeKey || "Resto";
      var total = groupAll.value();
      return {
        all: function() {
          var current = groupAll.value();
          return [
            {
                key: includeKey,
              value: current
            },
            {
                key: excludeKey,
              value: total - current
            }
          ]
        }
      }
    }   
    
    // Testeo de los grupos
    function print_filter(filter){
	   var f=eval(filter);
	   if (typeof(f.length) != "undefined") {}else{}
	   if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
	   if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
	   console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
    }
    console.log(critTotal)
    print_filter("criGroupTotal")
    console.log(probTotal)
    print_filter("probGroupTotal")
    print_filter("bubbleGroup")
    print_filter("criGroup")
    print_filter("cosTotal")
    print_filter("criGroup")
    print_filter("cosTotal")
    print_filter("pieGroup")
    
    // Tabla ACR
    tableChart = dc.dataTable("#dc-table-graph")
    
    // Elementos del Dashboard
    var countChart = dc.dataCount("#registers")
    chartCri = dc.rowChart('#criRow') //Se declaran como globales para poder hacer el reset
    chartProb = dc.rowChart('#probRow')
    bubbleChart = dc.bubbleChart('#bubbleChart')
    var numbCriTotal = dc.numberDisplay("#criSelec")
    var numbProbTotal = dc.numberDisplay("#probSelec")
    var numbCriPerc = dc.numberDisplay("#criPerc")
    var numbProbPerc = dc.numberDisplay("#probPerc")
    var pieCri = dc.pieChart("#criPie")
    var pieProb = dc.pieChart("#probPie")
    var numbCos = dc.numberDisplay("#presSelec")
    var numbHoras = dc.numberDisplay("#horSelec")
    var numbCrit = dc.numberDisplay("#critSelec")
    var numbProb = dc.numberDisplay("#probabSelec")
    var porcCrit = dc.numberDisplay("#critPorc")
    var porcProb = dc.numberDisplay("#probabPorc")
    
    // Tabla de resultados
    tableChartReport = dc.dataTable("#dc-table-report")
    
    // Escalas de colores
    var colorScaleCri = {"1": "#6FA84B","2": "#6FA84B","3": "#6FA84B", "4": "#6FA84B", "5": "#34B5AA","6": "#34B5AA", "8":"#F9D422","9":"#F9D422","10":"#F9D422","12":"#F9D422", "15":"#F28F3F","16":"#F28F3F", "20":"#E94F53","25":"#E94F53" };
    
    var colorScaleProb = {"1": "#C8E5E3","2": "#A3D5D1","3": "#80C9C6", "4": "#44B4C4", "5": "#1792A4"};
    
    /* 
     * Creacion de los elementos
     */
    
    // Tabla paginada ACR   
    var ofs = 0, pag = 10;
    
    function display() {
      d3.select('#begin')
          .text(ofs+1);
      d3.select('#end')
          .text(ofs+pag);
      d3.select('#last')
          .attr('disabled', ofs-pag<0 ? 'true' : null);
      d3.select('#next')
          .attr('disabled', ofs+pag>=ndx.size() ? 'true' : null);
      d3.select('#size').text(ndx.size());
    }
    
    function update() {
      tableChart.beginSlice(ofs);
      tableChart.endSlice(ofs+pag);
      display();
    }
    
    tableChart
       .dimension(allDim)
       .group(function(d){
            return ""
        })
       .size(Infinity)   
       .columns([
            function(d) {return d.causaRaiz},
            function(d) {return +d.probabilidad},
            function(d) {return +d.costeReparacion},
            function(d) {return +d.costePerdidaProduccion},
            function(d) {return +d.impacto},
            function(d) {return +d.riesgo},
            function(d) {return d.codigo},
            function(d) {return +d.coste},
            function(d) {return +d.mesesHombre}

        ])
       .sortBy(function (d) {
          return d.codigo;
       })
       .order(d3.ascending);
    
    update();

    d3.select('#last')
    .on('click',  function last() {
      ofs -= pag;
      update();
      tableChart.redraw();})
    
    d3.select('#next')
    .on('click',  function last() {
      ofs += pag;
      update();
      tableChart.redraw();})
    
    // Cabecera: valores totales 
    document.getElementById("dataInst").innerHTML = totalInst
    document.getElementById("criInst").innerHTML = critTotalValue
    document.getElementById("probInst").innerHTML = probTotalValue
    
    // Calculo del numero de registros
    countChart
        .dimension(ndx)
        .group(ndx.groupAll());
    
    // Diagrama de Burbujas
    bubbleChart
            .width(860)
            .height(400)
            .dimension(bubbleDimension)
            .group(bubbleGroup)
            .keyAccessor(function (p) {
                return p.value.costePerdidaProduccion;
            })
            .valueAccessor(function (p) {
                return p.value.costeReparacion;
            })
            .radiusValueAccessor(function (p) {
                return p.value.probabilidad;
               })
            .colorAccessor(function (p) {
                return p.value.riesgo;
            })
            .colors(function(d) {
                return colorScaleCri[d];
            })
            .x(d3.scaleLinear().domain(d3.extent(function (p) { return p.value.costePerdidaProduccion;})))
           .y(d3.scaleLinear().domain(d3.extent(function (p) { return p.value.costeReparacion;})))
           .r(d3.scaleLinear().domain([1, 5]))
           .yAxisLabel("Coste de pérdida de producción")
           .xAxisLabel("Coste de avería")
           .elasticY(true)
           .elasticX(true)
           .minRadiusWithLabel(100)
           .yAxisPadding(4) 
           .xAxisPadding(2)
           .maxBubbleRelativeSize(0.02)
           .renderHorizontalGridLines(true)
           .renderVerticalGridLines(true)
           .renderLabel(true)
           .renderTitle(true)
           .title(function (p) {
              return p.value.codigo
              + "\n"
              + "Coste Acción: " + p.value.coste + " m€"
              + "\n"
              + "Meses Hombre: " + p.value.mesesHombre;
            });
    
    bubbleChart.yAxis().tickFormat(function (s) {
           return s + " m€";
        });

    bubbleChart.xAxis().tickFormat(function (s) {
           return s + " m€";
        }); 
    
    bubbleChart.margins().left += 20;
    
    bubbleChart.margins().bottom += 20;
    
    // Selectores
    chartCri
            .width(440)
            .height(300)
            .x(d3.scaleLinear().domain([1,25]))
            .elasticX(true)
            .dimension(criDimension)
            .group(criGroupTotal)
            .colors(function (d) { return colorScaleCri[d];})
            .ordering(function(d) { return -d.key });
    
    chartCri.xAxis().ticks(3)
    
    chartProb
            .width(440)
            .height(300)
            .x(d3.scaleLinear().domain([1,5]))
            .elasticX(true)
            .dimension(probDimension)
            .group(probGroupTotal)
            .colors(function (d) { return colorScaleProb[d];})
            .ordering(function(d) { return -d.key });
    
    chartProb.xAxis().ticks(3)
           
    // Resultados (diagramas de tarta y numericos)
    pieCri
            .width(160)
            .height(160)
            .innerRadius(20)
            .dimension(criDimensionPie)
            .group(portion_group(criGroupAllPie))
            .ordinalColors(['rgba(132,141,197,0.8)', 'rgba(204,204,204,0.8)'])
            .minAngleForLabel(0.01)
            .on('pretransition', function(chart) {
                chart.selectAll('text.pie-slice').text(function(d) {
 /*                   return d3.select(this).text() && (d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%');*/
                    return d3.select(this).text();
                })               
            });
    
    pieCri.onClick = function(){}; // Desactivar seleccion
    
    pieProb
            .width(160)
            .height(160)
            .innerRadius(20)
            .dimension(probDimensionPie)
            .group(portion_group(probGroupAllPie))
            .ordinalColors(['rgba(124,92,180,0.8)', 'rgba(204,204,204,0.8)'])
            .minAngleForLabel(0.01)
            .on('pretransition', function(chart) {
                chart.selectAll('text.pie-slice').text(function(d) {
/*                    return d3.select(this).text() && (d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%');*/
                     return d3.select(this).text();
                })     
            });
    
    pieProb.onClick = function(){}; // Desactivar seleccion
    
    numbCriTotal
            .group(critTotal)
            .formatNumber(d3.format(".3s"))
            .valueAccessor( function(d) { return d; } );
    
    numbProbTotal
            .group(probTotal)
            .formatNumber(d3.format(".3s"))
            .valueAccessor( function(d) { return d; } );
    
    numbCriPerc
            .group(critTotal)
            .formatNumber(d3.format(".3s"))
            .valueAccessor( function(d) { return d/critTotalValue*100; } );
    
    numbProbPerc
            .group(probTotal)
            .formatNumber(d3.format(".3s"))
            .valueAccessor( function(d) { return d/probTotalValue*100; } );
    
    numbCos
            .group(cosTotal)
            .formatNumber(d3.format("d"))
            .valueAccessor( function(d) { return d; } );
    
    numbHoras
            .group(horTotal)
            .formatNumber(d3.format(".3s"))
            .valueAccessor( function(d) { return d; } );
    
    var restaCrit = function(d){return critTotalValue - +d}
    
    numbCrit
            .valueAccessor(restaCrit)
            .group(critTotal)
            .formatNumber(d3.format("d"))
    
    var restaProb = function(d){return probTotalValue - +d}

    numbProb
            .valueAccessor(restaProb)
            .group(probTotal)
            .formatNumber(d3.format("d"))
    
    var porcC = function(d){return (+d/critTotalValue)*100}
    
    porcCrit
            .valueAccessor(porcC)
            .group(critTotal)
            .formatNumber(d3.format(".3s")) 
    
    var porcP = function(d){return (+d/probTotalValue)*100}

    porcProb
            .valueAccessor(porcP)
            .group(probTotal)
            .formatNumber(d3.format(".3s"))
    
    // Descarga del resultado
    d3.select('#download')
    .on('click', function() {
        var data = criDimension.top(Infinity);
        var blob = new Blob([d3.csvFormat(data)], {type: "text/csv;charset=utf-8"});
        saveAs(blob, 'Report.csv');
    });
    
    
    // Tabla del resultado del ejemplo
    tableChartReport
       .dimension(allTableReport)
       .group(function(d){
            return ""
        })
       .size(Infinity)   
       .columns([
            function(d) {return d.causaRaiz},
            function(d) {return +d.probabilidad},
            function(d) {return +d.costeReparacion},
            function(d) {return +d.costePerdidaProduccion},
            function(d) {return +d.impacto},
            function(d) {return +d.riesgo},
            function(d) {return d.codigo},
            function(d) {return +d.coste},
            function(d) {return +d.mesesHombre}

        ])
       .sortBy(function (d) {
          return d.codigo;
       })
       .order(d3.ascending);
    
    dc.renderAll();
};

//////////////////////////////////////////////////////////////////////////
// Carga de datos y llamada a las visualizaciones
//////////////////////////////////////////////////////////////////////////

/*d3.queue()
    .defer(d3.csv,'data/data-3.csv')
    .defer(d3.csv, 'data/data-7.csv')
    .defer(d3.csv, 'data/reliability.csv')
    .defer(d3.csv,'data/acr.csv')
    .defer(d3.json,'data/matriz.json')
    .defer(d3.json,'data/matriz-blanco.json')
    .defer(d3.csv,'data/report.csv')
    //.defer(d3.csv,'data/Video_Games_Sales_as_at_22_Dec_2016.csv')
    .await(function(error, data3, data7, reliability, acr, matriz, matrizblanco, report){
        if (error){
            console.error('Something went wrong: ', error);
        }
        else {
            display(data3, data7, reliability, matrizblanco)
            visdashboard(acr, matriz, report)
        }
    });*/