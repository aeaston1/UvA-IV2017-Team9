

$(document).ready(function() {

    console.log("At least I'm here..")
    
    var svgSelection = d3.select("body")
        .append("svg")
        .attr("width", 50)
        .attr("height", 50)
        .attr("id", "SVG")
        

    dataset = new Array();
    for (var i=1; i<15; i++) 
        dataset.push(3*i);

    svgSelection.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "myrect")
        .attr("x", function(temp, ind) {return 3*ind;}) 
        .attr("y", function(temp, ind) {return temp;})
        .attr("width", 3)
        .attr("height", 0)
		.transition()
		.duration(100) 
        .attr("height", function(temp, ind) {return temp;})

})
