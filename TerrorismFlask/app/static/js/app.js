

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



function tooltipHtml(countryEntry){	/* function to create html content string in tooltip div. */
  return "<h4>"+countryEntry.country+"</h4><table>"+
  "<tr><td>Victims:</td><td>"+(countryEntry.victims_count)+"</td></tr>"+
  "<tr><td>Wounded:</td><td>"+(countryEntry.wounded_count)+"</td></tr>"+
  "</table>";
}
