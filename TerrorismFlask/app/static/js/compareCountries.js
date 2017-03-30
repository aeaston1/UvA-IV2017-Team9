


var plotCompareCountryStuffs = function() {


    scatter_config = getEmptyScatterConfig({'type': 'attacks_per_period'});
    var scatter_ctx = document.getElementById("scatter-compare-attacks").getContext("2d");
    window.myScatterCompareChart = new Chart(scatter_ctx, scatter_config)

    var attacks_radar_config = getEmptyRadarConfig({'type': 'attacktype'});
    var groups_radar_config = getEmptyRadarConfig({'type': 'groups'});
    var targets_radar_config = getEmptyRadarConfig({'type': 'targettype'});

    var attack_radar_ctx = document.getElementById("radar-compare-attacktype");
    window.RadarCompareAttacks = new Chart.PolarArea(attack_radar_ctx, attacks_radar_config);

    var groups_radar_ctx = document.getElementById("radar-compare-groups");
    window.RadarCompareGroups = new Chart.PolarArea(groups_radar_ctx, groups_radar_config);

    var target_radar_ctx = document.getElementById("radar-compare-targettype");
    window.RadarCompareTargets = new Chart.PolarArea(target_radar_ctx, targets_radar_config);



/*

            var countryLabel = document.getElementById("countryName");
            countryLabel.innerHTML = countryData.country;
            plot_sankey(countryData);
//            plot_counts(countryData);
            draw_wordle(countryData);

            var plotData = new Object;
            plotData[countryData.country] = countryData;

            attack_radar_config = plot_radar(plotData, 'attacktype');
            target_radar_config = plot_radar(plotData, 'targettype');
            groups_radar_config = plot_radar(plotData, 'groups', false);
//            scatter_config = plot_scatter(plotData, 'attacks_per_period');

//            var scatter_ctx = document.getElementById("scatter-compare-attacks").getContext("2d");
//            window.myChart = new Chart(scatter_ctx, scatter_config)

            var attack_radar_ctx = document.getElementById("radar-compare-attacktype");
            window.myPolarArea = new Chart.PolarArea(attack_radar_ctx, attack_radar_config);

            var groups_radar_ctx = document.getElementById("radar-compare-groups");
            window.myPolarArea = new Chart.PolarArea(groups_radar_ctx, groups_radar_config);

            var target_radar_ctx = document.getElementById("radar-compare-targettype");
            window.myPolarArea = new Chart.PolarArea(target_radar_ctx, target_radar_config);
*/
}

