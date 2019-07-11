queue()
    .defer(d3.json, "data/all_teams.json")
    .await(makeGraphs);

function makeGraphs(error, teamRosters) {
    var ndx = crossfilter(teamRosters);

    // teamRosters.forEach(function(d) {
    //     d.players__player__weight = parseFloat(d.players__player__weight);
    //     d.players__player__draft__year = parseFloat(d.players__player__draft__year);

    // });

    initMap();
    player_by_state(ndx);
    player_by_country(ndx);
    player_other_countries(ndx);
    player_position(ndx);
    // player_by_age(ndx);
    // player_by_draft_year(ndx);
    // player_average_weight(ndx, "#average-weight");

    dc.renderAll();
}

// ------------------------------------------------------------ VENUES MAP -------------------------------------------------

function initMap() {
    initVenuesMap();
    // initStatesMap();
}

function initVenuesMap() {

    var uluru = { lat: -25.363, lng: 131.044 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: 39.115413, lng: -94.610070 },
    });

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">TD Garden</h1>' +
        '<div id="bodyContent">' +
        '<p> Hola.</p>' +

        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });

    // Create labels for the markers.
    var labels = '';

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length],
            // icon: "https://maps.google.com/mapfiles/kml/paddle/purple-stars.png",
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    });
    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

}

var locations = [
    { lat: 33.757307, lng: -84.396324 }, // State Farm Arena, Atlanta, Georgia
    { lat: 42.366230, lng: -71.062146 }, // TD Garden, Boston, Massachussetts
    { lat: 40.682523, lng: -73.976094 }, // Barclays Center, Brooklyn, New York
    { lat: 35.225188, lng: -80.839306 }, // Spectrum Center, Charlotte, North Carolina
    { lat: 41.880694, lng: -87.674173 }, // United Center, Chicago, Illinois
    { lat: 41.496482, lng: -81.688214 }, // Rocket Mortgage FieldHouse, Cleveland, Ohio
    { lat: 32.790727, lng: -96.811091 }, // American Airlines Center, Dallas, Texas
    { lat: 39.748663, lng: -105.007710 }, // Pepsi Center, Denver, Colorado
    { lat: 42.341011, lng: -83.054971 }, // Little Caesars Arena, Detroit, Michigan
    { lat: 37.750305, lng: -122.202961 }, // Oracle Arena, Oakland, California
    { lat: 29.750764, lng: -95.362101 }, // Toyota Center, Houston, Texas
    { lat: 39.763890, lng: -86.155460 }, // Bankers Life Fieldhouse, Indianapolis, Indiana
    { lat: 34.043027, lng: -118.267254 }, // Staples Center, Los Angeles, California
    { lat: 35.138256, lng: -90.050503 }, // FedEx Forum, Memphis, Tennessee
    { lat: 25.781424, lng: -80.186969 }, // American Airlines Arena, Miami, Florida
    { lat: 43.045052, lng: -87.916793 }, // Fiserv Forum, Milwaukee, Wisconsin
    { lat: 44.979318, lng: -93.275697 }, // Target Center, Minneapolis, Minnesota
    { lat: 29.949038, lng: -90.082055 }, // Smoothie King Center, New Orleans, Louisiana
    { lat: 40.750517, lng: -73.993439 }, // Madison Square Garden, New York City, New York
    { lat: 35.463444, lng: -97.515096 }, // Chesapeake Energy Arena, Oklahoma City, Oklahoma
    { lat: 28.539229, lng: -81.383856 }, // Amway Center, Orlando, Florida
    { lat: 39.901311, lng: -75.171957 }, // Wells Fargo Center, Philadelphia, Pennsylvania
    { lat: 33.445742, lng: -112.071205 }, // Talking Stick Resort Arena, Phoenix, Arizona
    { lat: 45.531929, lng: -122.666866 }, // Moda Center, Portland, Oregon
    { lat: 29.427153, lng: -98.437490 }, // AT&T Center, San Antonio, Texas
    { lat: 38.580213, lng: -121.499660 }, // Golden 1 Center, Sacramento, California
    { lat: 43.643505, lng: -79.379106 }, // Scottiabank Arena, Toronto, Ontario
    { lat: 40.768298, lng: -111.901088 }, // Vivint Smart Home Arena, Salt Lake City, Utah
    { lat: 38.898114, lng: -77.020992 } // Capital One Arena, Washington, District of Columbia

];

//////////////////////////////////////////////////////////////////////////////////////////////////////

//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 4,
//         center: { lat: 39.115413, lng: -94.610070 },
//     });



//     // Create labels for the markers.
//     var labels = '';

//     // Add some markers to the map.

//     var markers = locations.map(function(location, i) {
//         return new google.maps.Marker({
//             position: location,
//             label: labels[i % labels.length],
//             // icon: "https://maps.google.com/mapfiles/kml/paddle/purple-stars.png",
//         });
//         markers.addListener('click', function() {
//             infowindow.open(map, markers);
//         });
//     });


//     // Add a marker clusterer to manage the markers.
//     var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
// }


// var locations = [
//     { lat: 33.757307, lng: -84.396324 }, // State Farm Arena, Atlanta, Georgia
//     { lat: 42.366230, lng: -71.062146 }, // TD Garden, Boston, Massachussetts
//     { lat: 40.682523, lng: -73.976094 }, // Barclays Center, Brooklyn, New York
//     { lat: 35.225188, lng: -80.839306 }, // Spectrum Center, Charlotte, North Carolina
//     { lat: 41.880694, lng: -87.674173 }, // United Center, Chicago, Illinois
//     { lat: 41.496482, lng: -81.688214 }, // Rocket Mortgage FieldHouse, Cleveland, Ohio
//     { lat: 32.790727, lng: -96.811091 }, // American Airlines Center, Dallas, Texas
//     { lat: 39.748663, lng: -105.007710 }, // Pepsi Center, Denver, Colorado
//     { lat: 42.341011, lng: -83.054971 }, // Little Caesars Arena, Detroit, Michigan
//     { lat: 37.750305, lng: -122.202961 }, // Oracle Arena, Oakland, California
//     { lat: 29.750764, lng: -95.362101 }, // Toyota Center, Houston, Texas
//     { lat: 39.763890, lng: -86.155460 }, // Bankers Life Fieldhouse, Indianapolis, Indiana
//     { lat: 34.043027, lng: -118.267254 }, // Staples Center, Los Angeles, California
//     { lat: 35.138256, lng: -90.050503 }, // FedEx Forum, Memphis, Tennessee
//     { lat: 25.781424, lng: -80.186969 }, // American Airlines Arena, Miami, Florida
//     { lat: 43.045052, lng: -87.916793 }, // Fiserv Forum, Milwaukee, Wisconsin
//     { lat: 44.979318, lng: -93.275697 }, // Target Center, Minneapolis, Minnesota
//     { lat: 29.949038, lng: -90.082055 }, // Smoothie King Center, New Orleans, Louisiana
//     { lat: 40.750517, lng: -73.993439 }, // Madison Square Garden, New York City, New York
//     { lat: 35.463444, lng: -97.515096 }, // Chesapeake Energy Arena, Oklahoma City, Oklahoma
//     { lat: 28.539229, lng: -81.383856 }, // Amway Center, Orlando, Florida
//     { lat: 39.901311, lng: -75.171957 }, // Wells Fargo Center, Philadelphia, Pennsylvania
//     { lat: 33.445742, lng: -112.071205 }, // Talking Stick Resort Arena, Phoenix, Arizona
//     { lat: 45.531929, lng: -122.666866 }, // Moda Center, Portland, Oregon
//     { lat: 29.427153, lng: -98.437490 }, // AT&T Center, San Antonio, Texas
//     { lat: 38.580213, lng: -121.499660 }, // Golden 1 Center, Sacramento, California
//     { lat: 43.643505, lng: -79.379106 }, // Scottiabank Arena, Toronto, Ontario
//     { lat: 40.768298, lng: -111.901088 }, // Vivint Smart Home Arena, Salt Lake City, Utah
//     { lat: 38.898114, lng: -77.020992 } // Capital One Arena, Washington, District of Columbia

// ];


//  ---------------------------------------------------- STATES MAP --------------------------------------------------------

// var mapStyle = [{
//     'stylers': [{ 'visibility': 'off' }]
// }, {
//     'featureType': 'landscape',
//     'elementType': 'geometry',
//     'stylers': [{ 'visibility': 'on' }, { 'color': '#fcfcfc' }]
// }, {
//     'featureType': 'water',
//     'elementType': 'geometry',
//     'stylers': [{ 'visibility': 'on' }, { 'color': '#bfd4ff' }]
// }];

// function initStatesMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 4,
//         center: { lat: 39.115413, lng: -94.610070 },
//         styles: mapStyle
//     });

//     // set up the style rules and events for google.maps.Data
//     map.data.setStyle(styleFeature);
//     map.data.addListener('mouseover', mouseInToRegion);
//     map.data.addListener('mouseout', mouseOutOfRegion);

//     // state polygons only need to be loaded once, do them now
//     loadMapShapes();
// }

// // Loads the state boundary polygons from a GeoJSON source. 
// function loadMapShapes() {
//     // load US state outline polygons from a GeoJson file
//     map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/states.js', { idPropertyName: 'STATE' });
// }

// var states_map_dim = parseFloat("players__player__birth_state");

// map.data
//     .get(states_map_dim);




// -------------------------------------------------------- PLAYER BY STATE PIE CHART ----------------------------------------

function player_by_state(ndx) {
    var state_dim = ndx.dimension(dc.pluck("players__player__birth_state"));
    var group = state_dim.group();

    dc.pieChart("#player-state")
        .width(800)
        .height(800)
        .radius(200)
        .transitionDuration(1500)
        .externalLabels(100)
        .drawPaths(true)
        .renderTitle(true)
        .minAngleForLabel(0)
        .dimension(state_dim)
        .group(group);
}

// ---------------------------------------------------------- PLAYER BY COUNTRY PIE CHART -------------------------------------

function player_by_country(ndx) {
    var country_dim = ndx.dimension(dc.pluck("players__player__birth_country"));
    var country_group = country_dim.group();

    var country_colorScale = d3.scale.ordinal().domain(["USA", "Others"])
        .range(["red", "blue"]);

    dc.pieChart("#player-country")
        .height(300)
        .width(300)
        .radius(200)
        .slicesCap(1)
        .colors(country_colorScale)
        .transitionDuration(1500)
        .dimension(country_dim)
        .group(country_group);
}

// ------------------------------------------------------- PLAYERS FROM OTHER COUNTRIES PIE CHART ------------------------------

function player_other_countries(ndx) {
    var otherCountries_dim = ndx.dimension(dc.pluck("players__player__birth_country"));
    var otherCountries_group = otherCountries_dim.group();


    dc.pieChart("#player-other-countries")
        .height(700)
        .width(700)
        .radius(200)
        .transitionDuration(1500)
        .externalLabels(50)
        .drawPaths(true)
        .renderTitle(true)
        .minAngleForLabel(0)
        .dimension(otherCountries_dim)
        .group(otherCountries_group)
        .data(function(group) {
            return group.all()
                .filter(function(d) { return d.key !== "USA"; });
        });

}

// ----------------------------------------------------------- PLAYER POSITION BAR CHART ------------------------------------

function player_position(ndx) {
    var position_dim = ndx.dimension(dc.pluck("players__player__primary_position"));
    var position_group = position_dim.group();
    var position_filtered_group = getTops(position_group);

    var colors = d3.scale.ordinal()
        .domain(["C", "PF", "SF", "SG", "PG"])
        .range(["purple", "yellow", "red", "green", "orange"])

    function getTops(position_group) {
        return {
            all: function() {
                return position_group.top(5);
            }
        };
    }

    dc.barChart("#player-position")
        .width(400)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(position_dim)
        .group(position_filtered_group)
        .transitionDuration(1500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Position")
        .elasticY(true)
        .yAxis().ticks;
}

// -------------------------------------------------- PLAYERS BY AGE ROW CHART ------------------------------------------

// function player_by_age(ndx) {
//     var age_dim = ndx.dimension(dc.pluck("players__player__age"));
//     var age_group = age_dim.group();

//     dc.barChart("#player-by-age")
//         .width(600)
//         .height(600)
//         .margins({ top: 10, right: 50, bottom: 30, left: 50 })
//         .dimension(age_dim)
//         .group(age_group)
//         .transitionDuration(500)
//         .x(d3.scale.linear())
//         .xUnits(dc.units.linear)
//         .xAxisLabel("Age")
//         .elasticY(true)
//         .yAxis().ticks(5);
// }

// ------------------------------------------------- PLAYERS BY DRAFT YEAR SCATTER PLOT ------------------------

// function player_by_draft_year(ndx) {
//     var draftYear_dim = ndx.dimension(dc.pluck("players__player__draft__year"));
//     var draftYear_group = draftYear_dim.group();

//     var min_year = draftYear_dim.bottom;
//     var max_year = draftYear_dim.top;

//     dc.scatterPlot("#player-by-draft-year")
//         .width(800)
//         .height(500)
//         .x(d3.scale.linear().domain([min_year, max_year]))
//         .brushOn(false)
//         .symbolSize(8)
//         .clipPadding(10)
//         .xAxisLabel("Year")
//         .dimension(draftYear_dim)
//         .group(draftYear_group)
//         .data(function(group) {
//             return group.all()
//                 .filter(function(d) { return d.key !== "null"; });
//         });

// }

// ------------------------------------------------------------- AVERAGE WEIGHT ------------------------------------------------

// function player_average_weight(ndx, players__player__primary_position, element) {

//     var averageWeight_dim = ndx.dimension(dc.pluck("players__player__primary_position"))

//     function add_item(p, v) {
//         p.count++;
//         p.total += v.players__player__weight;
//         p.average = p.total / p. count;

//         return p;
//     }

//     function remove_item(p, v) {
//         p.count --;
//         if(p.count == 0) {
//             p.total = 0;
//             p.average = 0;
//         } else {
//             p.total -= v.players__player__weight;
//             p.average = p.total / p.count;
//         }
//         return p;
//     }

//     var averageWeight_group = averageWeight_dim.group().reduce(add_item, remove_item);

// dc.numberDisplay(element)
//     .formatNumber(d3.format(".2"))
//     .dimension(averageWeight_dim)
//     .group(averageWeight_group);
// }
