

var plot_sankey = function(data) {

    // Ideally, the correct data should be sent (I guess), so we don't filter it here

    var correlations = data['target_attack_corr'];

    var sums = new Object();
    Object.keys(correlations).forEach(function(target) {
        sums[target] = d3.sum(Object.values(correlations[target]))
    });
    var total =  d3.sum(Object.values(sums));

    var sankey = new Sankey();

    var target_nodes = Object.keys(data['targettype']);
    var attack_nodes = Object.keys(data['attacktype']);
    var edges = new Array();

    Object.keys(correlations).forEach(function(target) {
        Object.keys(correlations[target]).forEach(function(attack) {
            var cnt = correlations[target][attack];
//            edges.push([target, cnt/sums[target]*100, attack]);
            edges.push([target, cnt, attack]); 
       });
    });

    console.log(edges);

    sankey.stack(0, target_nodes);
    sankey.stack(1, attack_nodes);

    sankey.convert_flow_values_callback = function(flow) {
//        return flow * 0.05; // Pixels per TWh
         return flow * ( 100 / total ) 
    };
      
    sankey.convert_flow_labels_callback = function(flow) {
        return Math.round(flow);
    };

    sankey.setData(edges);

    sankey.draw();    



};

