



var plot_scatter = function(data, x_var='attacks_per_period', chart=false) {
    console.log(data, x_var, chart)

    /*
    document.getElementById('addData').addEventListener('click', function() {
        ['Bulgaria', 'Belgium'].forEach(function(country) {
        $.getJSON('/get_country/' + country, function(data) {
            console.log('Adding country', country)
            var chart = window.myChart
            plot_scatter(data, x_var, chart)
            chart.update()
        })
      })
    });
    */

    if (chart) {
        var Data = chart.config.oldData;
        Data[data.country] = data;
        console.log('Ended up with combined data:', Data)
        var new_config = plot_scatter(Data, x_var, false);
        chart.config = new_config;
        chart.update()
        return
    } 

//    var x_var = 'attacks_per_period'
    var r_var = 'victims_per_period'
//    var r_var = 'wounded_per_period'

    var datasets = new Array();
    var labels = new Array();
    for (var i = 1970; i <= 2015; i+=5) labels.push(i);
    var all_victims = 0;
    Object.keys(data).forEach(function(country) {
        var r_data = data[country][r_var];
        var r_sum = d3.sum(Object.values(r_data))   
        all_victims += r_sum + 1
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
//                                         r: 100 * (r_data[label]+1) / all_victims,
//                                         r: Math.sqrt(1000 * (r_data[label]+1) / (all_victims * 3.14 * 3.14) )
                                           r: Math.sqrt(4 * (r_data[label]+1) / ( 3.14 * 3.14) ),
                                           victims: r_data[label]
                                        });
            else
                newDataset['data'].push({x: label,
                                         y: 0,
                                         r: Math.sqrt(4 / ( 3.14 * 3.14) ),
                                         victims: 0
                                        });

        });
        datasets.push(newDataset);

    });



    console.log(datasets);

    var config = getEmptyScatterConfig({'type': x_var})
    config.data.datasets = datasets; 
    config.oldData = data;

    return config

    console.log(config)
}


var getEmptyScatterConfig = function(params={'title': 'MyScatterPlot', 'type': false}) {

    var type = params.type;
    var title = params.title;

    var titleString;
    if (type) {
        if (type === 'attacks_per_period')
            titleString = 'Number of attacks per period';
        else
            titleString = title;
    } else
        titleString = title;



    var labels = new Array();
    for (var i = 1970; i <= 2015; i+=5) labels.push(i);

    var bubbleChartData = {
        animation: {
            duration: 10000
        },
        datasets: [],
        labels: labels
    };


    var config = {
        type: 'bubble',
        data: bubbleChartData,
        options: {
            responsive: true,
            title:{
                display:true,
                text: titleString
            },
            tooltips: {
//                mode: 'point',
                 callbacks: {
                    label: function(tooltipItems, data) {
                        var label = new Array();
//                        var period_end = parseInt(data.labels[tooltipItems.index]);
                        var period_end = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index].x
                        var period_start = period_end - 5;
                        label.push('Period: ' + period_start + '-' + period_end);
                        data.datasets.forEach ( function (dataset) {
                            var attacks = dataset.data[tooltipItems.index].y;
                            var victims = dataset.data[tooltipItems.index].victims;
                            label.push(dataset.label + ': ' + attacks + ' attacks; ' + victims + ' victims')
                        })
                        return label;
                    }
                }
            }
        },
        oldData: {}
    }
    
    return config;
}
