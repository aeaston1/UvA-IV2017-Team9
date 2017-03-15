

var plot_sankey = function(data) {

    // Ideally, the correct data should be sent (I guess), so we don't filter it here

    console.log(data);
    console.log(data['target_attack_corr'])

    var sankey = new Sankey();

    /*      
    sankey.stack(0,["Top","Bottom"]);
    sankey.stack(1,["Merge"]);
    sankey.stack(2,["Good","Bad"]);
      
    sankey.setData([["Top",100,"Merge"],["Bottom",50,"Merge"],["Merge",70,"Good"],["Merge",80,"Bad"]]);
    sankey.draw();
    */

    var correlations = data['target_attack_corr'];

    var target_nodes = Object.keys(data['targettype']);
    var attack_nodes = Object.keys(data['attacktype']);
    var edges = new Array();


    Object.keys(correlations).forEach(function(target) {
        Object.keys(correlations[target]).forEach(function(attack) {
            var cnt = correlations[target][attack];
            console.log(target, attack, cnt);
            edges.push([target, cnt, attack]);
        });
    });

    console.log(edges);

    sankey.stack(0, target_nodes);
    sankey.stack(1, attack_nodes);

    sankey.setData(edges);
    sankey.draw();    


};

