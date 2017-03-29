

var plot_radar = function(data, type, scale=true, chart=false) {
    console.log(data, type, scale, chart)

    console.log("Begining")
    if (chart) {
        var Data = chart.config.oldData;
        Data[data.country] = data;
        console.log('Ended up with combined data:', Data)
        var new_config = plot_radar(Data, type, scale, false);
//        chart.config = new_config;
//        chart.config.data=new_config.data;
        chart.config.data.datasets = new_config.data.datasets;
        chart.config.data.labels = new_config.data.labels;
        console.log('Before update', chart)
        chart.update()
        return
    }

    console.log('Outside')

    var datasets = new Array();
    var labels = new Array();


    // I dont know enough javascripts so thats my great implementation of 
    // "Keep top 5 labels per country only¨ 
    Object.keys(data).forEach(function(country) {
        var currentData = data[country][type];
        var values = Object.values(currentData);
        var keys = Object.keys(currentData);
        var len = values.length;
        var indices = new Array(len)
        for (var i = 0; i < len; ++i) indices[i] = i;
        indices.sort(function (a, b) { return values[a] > values[b] ? -1 : values[a] < values[b] ? 1 : 0; });
        var keep_labels = new Array();
        for (var ind = 0; ind < 5; ind++) {
            keep_labels.push(keys[indices[ind]]);
        }        
//        var new_labels = union(labels, Object.keys(data[country][type]));
        var new_labels = union(labels, keep_labels);
        labels = new_labels;
    });    
    

    Object.keys(data).forEach(function(country) {
        // Adjust colors per coountry 
        var newDataset = {label: country,
//                           fillColor : "rgba(220,220,220,0.5)",
                           fillColor: getRandomColor(),
                           strokeColor : "rgba(220,220,220,1)",
                           pointColor : "rgba(220,220,220,1)", 
                           data: []}
 
        var sum = d3.sum(Object.values(country_data = data[country][type]));

        var country_data = data[country][type];
        labels.forEach(function(label) {
            if (country_data.hasOwnProperty(label)) {
                if (scale)
                    newDataset['data'].push(country_data[label] / sum);
                else
                    newDataset['data'].push(country_data[label]);
                }
            else
                newDataset['data'].push(0);

        });
        datasets.push(newDataset);
 
    });



    var backgroundColors = new Array();
    labels.forEach(function(label) {
        backgroundColors.push(getRandomColor());
    });

    console.log("Before assign")

    config = getEmptyRadarConfig();
    config.data.datasets = datasets;
    config.data.labels = labels;
//    config.data.backgroundColor = backgroundColors;
    config.oldData = data;

    console.log("After return")

    return config
}


console.log("Something in the middle")

var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};



    function unique(x) {
        return x.filter(function(elem, index) { return x.indexOf(elem) === index; });
    };
    function union(x, y) {
        return unique(x.concat(y));
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }




var getEmptyRadarConfig = function() {
    var config = {
        data: {
            datasets: [],
            labels: [],
            backgroundColor: []
        },
        options: {
            responsive: true,
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Polar Area Chart'
            },
            scale: {
              ticks: {
                beginAtZero: true
              },
              reverse: false
            },
            animation: {
                animateRotate: false,
                animateScale: true
            },
            tooltips: {
                mode: 'label'
            }
        },
        oldData: {}
    };

    return config;
}


