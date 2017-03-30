


var plotCountryStuffs = function(countryData) {


    [window.myScatterChart, window.RadarAttacks, window.RadarGroups, window.RadarTargets].forEach(function(chart) {
        if (chart)
            console.log("Destroying old chart")
            chart.destroy();
    })



            var countryLabel = document.getElementById("countryName");
            countryLabel.innerHTML = countryData.country;
            plot_sankey(countryData);
            draw_wordle(countryData);

            var plotData = new Object;
            plotData[countryData.country] = countryData;

            attack_radar_config = plot_radar(plotData, 'attacktype');
            target_radar_config = plot_radar(plotData, 'targettype');
            groups_radar_config = plot_radar(plotData, 'groups', false);
            scatter_config = plot_scatter(plotData, 'attacks_per_period');

            var scatter_ctx = document.getElementById("scatter-attacks").getContext("2d");
            window.myScatterChart = new Chart(scatter_ctx, scatter_config)

            var attack_radar_ctx = document.getElementById("radar-attacktype");
            window.myRadarAttacks = Chart.PolarArea(attack_radar_ctx, attack_radar_config);

            var groups_radar_ctx = document.getElementById("radar-groups");
            window.myRadarGroups = Chart.PolarArea(groups_radar_ctx, groups_radar_config);

            var target_radar_ctx = document.getElementById("radar-targettype");
            window.myRadarTargets = Chart.PolarArea(target_radar_ctx, target_radar_config);

}

/*
var loadCountryData = function(selectedCountry, previousCountry){
//        var countryData = {{ country_data|tojson }};
        var countryData;
{#        selectedCountry = "Belgium";#}
        $.getJSON('{{ url_for("get_country", country=selectedCountry) }}'  + selectedCountry, function(current_attack_data) {

            console.log("Making sure that the correct func is executed")         
            countryData = current_attack_data;
            console.log(selectedCountry, countryData, current_attack_data)
            console.log("previous:"+ previousCountry);
            if (previousCountry === selectedCountry) return previousCountry;
            previousCountry = selectedCountry;

            var countryLabel = document.getElementById("countryName");
            countryLabel.innerHTML = countryData.country;
            plot_sankey(countryData);
            plot_counts(countryData);
            draw_wordle(countryData);

            var plotData = new Object;
            plotData[countryData.country] = countryData;

            attack_radar_config = plot_radar(plotData, 'attacktype');
            target_radar_config = plot_radar(plotData, 'targettype');
            groups_radar_config = plot_radar(plotData, 'groups', false);
            scatter_config = plot_scatter(plotData, 'attacks_per_period');

            var scatter_ctx = document.getElementById("scatter-attacks").getContext("2d");
            window.myChart = new Chart(scatter_ctx, scatter_config)

            var attack_radar_ctx = document.getElementById("radar-attacktype");
            window.myPolarArea = Chart.PolarArea(attack_radar_ctx, attack_radar_config);

            var groups_radar_ctx = document.getElementById("radar-groups");
            window.myPolarArea = Chart.PolarArea(groups_radar_ctx, groups_radar_config);

            var target_radar_ctx = document.getElementById("radar-targettype");
            window.myPolarArea = Chart.PolarArea(target_radar_ctx, target_radar_config);
          }

            return previousCountry;
        })
    }
*/
