




var plot_scatter = function(data) {
    var x_var = 'attacks_per_period'
    var r_var = 'victims_per_period'
//    var r_var = 'wounded_per_period'

    var datasets = new Array();
    var labels = new Array();
    for (var i = 1970; i <= 2015; i+=5) labels.push(i);
    var all_victims = 0;
    Object.keys(data).forEach(function(country) {
        var r_data = data[country][r_var];
        var r_sum = d3.sum(Object.values(r_data))   
        all_victims += r_sum
    })

    var addedCount = 0;
    var color = Chart.helpers.color;
    var colorNames = Object.keys(window.chartColors);

    Object.keys(data).forEach(function(country) {
        // Adjust colors per coountry 
        ++addedCount;
        var colorName = colorNames[addedCount % colorNames.length];;
        var dsColor = window.chartColors[colorName];
        var newDataset = {
            label: country,
            backgroundColor: color(dsColor).alpha(0.5).rgbString(),
            borderColor: dsColor,
            borderWidth: 1,
            data: []
        }

        var x_data = data[country][x_var];
        var r_data = data[country][r_var];

        // Radius = #victims / all_victims
        // Scale better
        labels.forEach(function(label) {
            if (x_data.hasOwnProperty(label))
                newDataset['data'].push({x: label, 
                                         y: x_data[label], 
                                         r: 100 * r_data[label] / all_victims
                                        });
        });
        datasets.push(newDataset);

    });

    console.log(datasets);

    var bubbleChartData = {
        animation: {
            duration: 10000
        },
        datasets: datasets
    };


    var config = {            
        type: 'bubble',
        data: bubbleChartData,
        options: {
            responsive: true,
            title:{
                display:true,
                text:'Chart.js Bubble Chart'
            },
            tooltips: {
                mode: 'point'
            }
        }
    }

/*
    window.onload = function() {
        var ctx = document.getElementById("scatter-attacks").getContext("2d");
        window.myChart = new Chart(ctx, config)
        });

    };
*/
    return config
}
