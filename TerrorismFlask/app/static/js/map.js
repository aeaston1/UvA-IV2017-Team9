var makemap=function (data) {
    var mymap = L.map('mapid').setView([20, 0], 3);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 5,id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoianVsaXVzcHIiLCJhIjoiY2l6dHh5YTBmMDAxZzMyczNzaHI4YjNhZyJ9.-jUqs6BQQV9_nBUJufLTOg'}).addTo(mymap);

    for (var i=0; i<1000;i++) {
        L.marker([data[i].latitude,data[i].longitude]).addTo(mymap);
    }

    // var markers = L.geoJson(null, {
    //     pointToLayer: createClusterIcon
    // }).addTo(map);

    // var index = supercluster({
    //     radius: 40,
    //     maxZoom: 16
    // });
    // index.load(data);
    // index.getClusters([-180, -85, 180, 85], 2);

}





// DO WE STILL NEED THIS????
// AmCharts.makeChart( "mapdiv", {
//   /**
//    * this tells amCharts it's a map
//    */
//   "type": "map",
//
//   /**
//    * create data provider object
//    * map property is usually the same as the name of the map file.
//    * getAreasFromMap indicates that amMap should read all the areas available
//    * in the map data and treat them as they are included in your data provider.
//    * in case you don't set it to true, all the areas except listed in data
//    * provider will be treated as unlisted.
//    */
//   "dataProvider": {
//     "map": "worldLow",
//     "getAreasFromMap": true
//   },
//
//   /**
//    * create areas settings
//    * autoZoom set to true means that the map will zoom-in when clicked on the area
//    * selectedColor indicates color of the clicked area.
//    */
//   "areasSettings": {
//     "autoZoom": true,
//     "selectedColor": "#CC0000"
//   },
//
//   /**
//    * let's say we want a small map to be displayed, so let's create it
//    */
//   "smallMap": {}
// } );