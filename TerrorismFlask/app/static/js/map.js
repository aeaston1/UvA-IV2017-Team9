var makemap=function (data) {
    var locations = Object.values(data);
    initMap();
}
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: {lat: 30, lng: 0},
           styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
        });

        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location
          });
        });
        // gridSize determins the number of clusters. larger grid size --> less clusters
        var mcOptions = {gridSize: 200, maxZoom: 15, imagePath: 'static/imgs/mapClusterImages/m'};
        var markerCluster = new MarkerClusterer(map, markers,mcOptions);
    }






    //old code for leafletJS. not used at all anylonger.
    // console.log("im here - julius");
    // var mymap = L.map('mapid').setView([20, 0], 3);
    //
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //     maxZoom: 5,id: 'mapbox.dark',
    //     accessToken: 'pk.eyJ1IjoianVsaXVzcHIiLCJhIjoiY2l6dHh5YTBmMDAxZzMyczNzaHI4YjNhZyJ9.-jUqs6BQQV9_nBUJufLTOg'}).addTo(mymap);
    //
    // for (var i=0; i<1000;i++) {
    //     L.marker([data[i].latitude,data[i].longitude]).addTo(mymap);
    // }

    // var markers = L.geoJson(null, {
    //     pointToLayer: createClusterIcon
    // }).addTo(map);
    // var index = supercluster({
    //     radius: 40,
    //     maxZoom: 16
    // });
    // index.load(data);
    // index.getClusters([-180, -85, 180, 85], 2);
    // index.addTo(mymap);
// }

