

function draw_wordle(data) {
  /*
  var cloud = d3.layout.cloud()

  var words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"]
    .map(function(d) {
      return {text: d, size: 10 + Math.random() * 90};
    });

  cloud.size([960, 500])
    .canvas(function() { return new Canvas(1, 1); })
    .words(words)
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", end)
    .start();

  function end(words) { console.log(JSON.stringify(words)); } 
  */

var cloud = d3.layout.cloud()

var fill = d3.scale.category20(); //.category20();

/*
var layout = cloud
    .size([500, 500])
    .words([
      "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this"].map(function(d) {
      return {text: d, size: 10 + Math.random() * 90, test: "haha"};
    }))
*/

    var maxVal = d3.max(Object.values(data['words']))
    console.log(maxVal)

var layout = cloud
    .size([500, 500])
    .words(Object.keys(data['words']).map(function(d) {
      return {text: d, size: 10 + data['words'][d] / maxVal * 50, test: "haha"};
    }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
//    .rotate(function() { return 0 * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

layout.start();

function draw(words) {
    d3.select("#wordle").select("svg").remove();
  d3.select("#wordle").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}
};
