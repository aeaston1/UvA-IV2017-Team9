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

