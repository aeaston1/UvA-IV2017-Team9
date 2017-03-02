

var plot_counts = function(data) {

    // Ideally, the correct data should be sent (I guess), so we don't filter it here

    var filtered_data = new Object();
    for(var key in data) {
        if ( key.indexOf('kill') !== -1 || key.indexOf('wound') !== -1 || key.indexOf('_count') !== -1 ) {
            var value = data[key];
            filtered_data[key] = value;
        }
    }

    var names = new Array();
    var dataset = new Array();
    for (var key in filtered_data) {
        names.push(key.split('_')[0]);
        dataset.push(filtered_data[key]);
    }
    console.log(dataset);

    var maxElem = d3.max(dataset);

    var barH = 100;
    var svgPadH = 40;        
    var svgH = barH + svgPadH;
    var barH_func = function(cnt) {
        return cnt * barH / maxElem;
    }
    var barYLocation_func = function(cnt) {
        return barH - barH_func(cnt);
    }
    var barYTop_func = function(cnt) {
        return barYLocation_func(cnt) + 15;
    }
    var padYCenter = barH + svgPadH / 2;
    var canvasYTop = 50;
        
    // width of bars, canvas, padding for axis and prettiness, etc
    var barW = 70;
    var barPadW = 5;
    var paddedBarW = barW + barPadW; 
    var svgPadW = 40;
    var svgW = svgPadW + paddedBarW * dataset.length;
    console.log("Stuff:" + svgPadW + paddedBarW + dataset.length);

    var barXLocation_func = function(barInd) {
        return svgPadW + barInd * paddedBarW;
    }    
    var barXCenter_func = function(barInd) {
        return barXLocation_func(barInd) + barW / 2;
    }
    var canvasXTop = svgW - 50;


    var svgSelection = d3.select("body")
        .append("svg")
        .attr("width", svgW)
        .attr("height", svgH)
        .attr("id", "SVG");


    // Make the bars...
    svgSelection.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "myrect")
        .attr("x", function(temp, ind) {return barXLocation_func(ind);}) 
        .attr("y", function(temp, ind) {return barYLocation_func(temp);})
        .attr("width", barW)
        .attr("height", 0)
		.transition()
		.duration(2000) 
        .attr("height", function(temp, ind) {return barH_func(temp);})


    svgSelection.selectAll("text.values")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(temp, ind) {return temp;})
        .attr("x", function(temp, ind) {return barXCenter_func(ind);})
        .attr("y", function(temp, ind) {return barYTop_func(temp);})
        .attr("text-anchor", "middle")
	.attr("font-size","14px")
        .style("fill", "white");


    svgSelection.selectAll("text.labels")
        .data(names)
        .enter()
        .append("text")
        .text(function(name, ind) {return name;})
        .attr("x", function(name, ind) {return barXCenter_func(ind);})
        .attr("y", function(name, ind) {return padYCenter;})
        .attr("text-anchor", "middle");


};
