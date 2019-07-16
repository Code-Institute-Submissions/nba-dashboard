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


    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: 38, lng: -95 },

    });

    setMarkers(map, locations);
}

function setMarkers(map, locations) {

    var marker, i;

    for (i = 0; i < locations.length; i++) {

        var lat = locations[i][0];
        var long = locations[i][1];
        var team = locations[i][2];
        var yearFounded = locations[i][3];
        var venueName = locations[i][4];
        var venueCapacity = locations[i][5];

        var latlngset = new google.maps.LatLng(lat, long);

        var markerTitle = team + " @ " + venueName;

        var marker = locations.map(function(location, i) {
            return new google.maps.Marker({
                // var marker = new google.maps.Marker({
                //     position: { lat: 42.366230, lng: -71.062146 },
                // label: labels[i % labels.length],
                position: latlngset,
                icon: "https://maps.google.com/mapfiles/kml/paddle/purple-stars.png",
                title: markerTitle,
                map: map,
            });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, marker, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

        // map.setCenter(marker.getPosition());

        var contentString = "Team: " + team + "Venue: " + venueName;

        var infowindow = new google.maps.InfoWindow()

        google.maps.event.addListener(marker, 'click', (function(markers, contentString, infowindow) {
                return function() {
                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                };
            })
            (marker, contentString, infowindow)
        );

    }

}

var locations = [

    //  lat,         long,      team,        year    venue            capacity       
    [33.757307, -84.396324, "Atlanta Hawks", 1946, "State Farn Arena", 18118], // Atlanta, Georgia
    [42.366230, -71.062146, "Boston Celtics", 1946, "TD Garden", 18624], // Boston, Massachussetts
    [40.682523, -73.976094, "Brooklyn Nets", 1967, "Barclays Center", 17732], // Brooklyn, New York
    [35.225188, -80.839306, "Charlotte Hornets", 1988, "Spectrum Center", 19077], // Charlotte, North Carolina
    [41.880694, -87.674173, "Chicago Bulls", 1966, "United Center", 20917], // Chicago, Illinois
    [41.496482, -81.688214, "Cleveland Cavaliers", 1970, "Rocket Mortgage FieldHouse", 20562], //  Cleveland, Ohio
    [32.790727, -96.811091, "Dallas Mavericks", 1980, "American Airlines Center", 19200], // Dallas, Texas
    [39.748663, -105.007710, "Denver Nuggets", 1967, "Pepsi Center", 19520], // Denver, Colorado
    [42.341011, -83.054971, "Detroit Pistons", 1941, "Little Caesars Arena", 20491], // Detroit, Michigan
    [37.750305, -122.202961, "Golden State Warriors", 1946, "Oracle Arena", 19596], // Oakland, California
    [29.750764, -95.362101, "Houston Rockets", 1967, "Toyota Center", 18500], // Houston, Texas
    [39.763890, -86.155460, "Indiana Pacers", 1967, "Bankers Life Fieldhouse", 20000], // Indianapolis, Indiana
    [34.043027, -118.267254, "Los Angeles Clippers", 1970, "Staples Center", 18997], // Los Angeles, California
    [34.043497, -118.267447, "Los Angeles Lakers", 1947, "Staples Center", 18997], // Los Angeles, California
    [35.138256, -90.050503, "Memphis Grizzlies", 1995, "FedEx Forum", 18119], // Memphis, Tennessee
    [25.781424, -80.186969, "Miami Heat", 1988, "American Airlines Arena", 19600], //  Miami, Florida
    [43.045052, -87.916793, "Milwaukee Bucks", 1968, "Fiserv Forum", 17500], // Milwaukee, Wisconsin
    [44.979318, -93.275697, "Minnesota Timberwolves", 1989, "Target Center", 19356], // Minneapolis, Minnesota
    [29.949038, -90.082055, "New Orleans Pelicans", 1988, "Smoothie King Center", 16867], // New Orleans, Louisiana
    [40.750517, -73.993439, "New York Knicks", 1946, "Madison Square Garden", 19812], // New York City, New York
    [35.463444, -97.515096, "Oklahoma City Thunder", 1967, "Chesapeake Energy Arena", 18203], // Oklahoma City, Oklahoma
    [28.539229, -81.383856, "Orlando Magic", 1989, "Amway Center", 18846], // Orlando, Florida
    [39.901311, -75.171957, "Philadelphia 76ers", 1946, "Wells Fargo Center", 20478], // Philadelphia, Pennsylvania
    [33.445742, -112.07120, "Phoenix Suns", 1968, "Talking Stick Resort Arena", 18422], // Phoenix, Arizona
    [45.531929, -122.666866, "Portland Trailblazers", 1970, "Moda Center", 19393], // Portland, Oregon
    [29.427153, -98.437490, "San Antonio Spurs", 1967, "AT&T Center", 18581], // San Antonio, Texas
    [38.580213, -121.49966, "Sacramento Kings", 1923, "Golden 1 Center", 17608], // Sacramento, California
    [43.643505, -79.379106, "Toronto Raptors", 1995, "Scottiabank Arena", 19800], // Toronto, Ontario
    [40.768298, -111.901088, "Utah Jazz", 1974, "Vivint Smart Home Arena", 18306], // Salt Lake City, Utah
    [38.898114, -77.020992, "Washington Wizards", 1961, "Capital One Arena", 20356], // Washington, District of Columbia

];









////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//     for (var i = 0; i < locations.length; i++) {

//         var lat = locations[i][0]
//         var lng = locations[i][1]

//         google.maps.event.addListener(marker, 'click', (function(marker, contentString, infowindow) {
//             return function() {
//                 infowindow.setContent(contentString);
//                 infowindow.open(map, marker);
//             };
//         })(marker, contentString, infowindow));


//         var contentString = '<div id="content">' +
//             '<div id="siteNotice">' +
//             '</div>' +
//             '<div id="teamName" class="firstHeading">Boston Celtics</div>' +
//             '<div id="teamYear" class="firstHeading">1946</div>' +
//             '<div id="venueName" class="firstHeading">TD Garden</div>' +
//             '<div id="venueCapacity" class="firstHeading">TD Garden</div>' +
//             '<div id="bodyContent">' +
//             '</div>';

//         var infowindow = new google.maps.InfoWindow({
//             content: contentString,
//             maxWidth: 200
//         });

//         // Create labels for the markers.
//         // var labels = '';

//         var marker = locations.map(function(location, i) {
//             return new google.maps.Marker({
//                 // var marker = new google.maps.Marker({
//                 //     position: { lat: 42.366230, lng: -71.062146 },
//                 // label: labels[i % labels.length],
//                 position: location,
//                 icon: "https://maps.google.com/mapfiles/kml/paddle/purple-stars.png",
//                 map: map,
//             });
//         });
//     }










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
