
// MAP
var map = L.map("map",{
    center: [53.54, -113.49],
    zoom: 11
});

// TILE LAYER
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// ALTERNATIVE
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);

// NEIGHBOURHOOD JSON
// https://data.edmonton.ca/dataset/Neighbourhood-Boundaries-2019/xu6q-xcmj
let neighbourhoods = "https://data.edmonton.ca/resource/xu6q-xcmj.json"


// DEVELOPMENT PERMIT JSON
// https://data.edmonton.ca/Urban-Planning-Economy/Development-Permits-from-2019-to-present/q4gd-6q9r
let development = "https://data.edmonton.ca/resource/q4gd-6q9r.json"


// POLYGON STYLE
var featureStyle = {
    color: "black",
    fillColor: "black",
    fillOpacity: 0.1,
    weight: 0.25,
}


// NEIGHBOURHOOD GEOMETRY
d3.json(neighbourhoods).then(function(neighbourhoodData) {

    for (let j = 0; j < neighbourhoodData.length; j++) {

        // FEATURE VARIABLES
        var featureID = neighbourhoodData[j]["neighbourh"]
        var featureName = neighbourhoodData[j]["descriptiv"];
        var shapeData = neighbourhoodData[j]["the_geom"]["coordinates"][0][0];

        // RESTRUCTURE SHAPE
        var featureCoords = []
        for (let i = 0; i < shapeData.length; i++) {
            featureCoords.push([shapeData[i][1], shapeData[i][0]])
        };

        // CREATE VARIABLE
        var feature = L.polygon(featureCoords, featureStyle);

        // MOUSEOVER
        feature.on("mouseover", function (e) {
            // e.target.setStyle({
            //     fillOpacity: 0.5,
            // });
            e.target.openPopup();
        });

        // MOUSEOUT
        feature.on("mouseout", function (e) {
            // e.target.setStyle({
            //     fillOpacity: 0.1,
            // });
            e.target.closePopup();
        });

        // CLICK
        // feature.on("click", function (e) {
        //     L.bind(showDevelopments, null, featureID)
        //     map.fitBounds(e.target.getBounds());
        //     showDevelopments(e, featureID);
        // });

        feature.on("click", L.bind(showDevelopments, null, featureID));
        feature.on("click", function (e) {
            map.fitBounds(e.target.getBounds());
        });

        // POPUP
        feature.bindPopup(`${featureName}<br>${featureID}`, {closeButton: false});
        

        // ADD TO MAP
        feature.addTo(map);
    };
});

// MARKER GROUP FOR DEVELOPMENT DATA
var markerGroup = L.layerGroup().addTo(map);

function showDevelopments(selectedNeighbourhood) {

    // CLEAR OLD MARKERS
    markerGroup.clearLayers();
    
    // GET DEVELOPMENT DATA
    var url_string = "?neighbourhood_id=" + selectedNeighbourhood
    $.ajax({
        url: "https://data.edmonton.ca/resource/q4gd-6q9r.json" + url_string,
        type: "GET",
        data: {"$limit" : 5000, "$$app_token" : config["CITY_KEY"],}
    }).done(function(data) {
    

        // ADD DEVELOPMENT MARKERS
        for (let i = 0; i < data.length; i++) {   
            var lat = data[i]["latitude"]
            var lon = data[i]["longitude"]                      
            var marker = L.marker([lat,lon]).addTo(markerGroup);
        };

    });

};

