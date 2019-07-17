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
    player_by_age(ndx);
    player_by_draft_year(ndx);
    // player_average_weight(ndx, "#average-weight");

    dc.renderAll();
}

// ------------------------------------------------------------ VENUES MAP -------------------------------------------------

// Co-ordinates and data used on map
var locations = [

    //  lat,         long,      team,        year    venue            capacity       
    [33.757307, -84.396324, "Atlanta Hawks", 1946, "State Farn Arena", 18118, '<img id="window-logo" src="logos/atlanta_hawks.png">', "Atlanta, Georgia"],
    [42.366230, -71.062146, "Boston Celtics", 1946, "TD Garden", 18624, '<img id="window-logo" src="logos/boston_celtics.png">', "Boston, Massachussetts"],
    [40.682523, -73.976094, "Brooklyn Nets", 1967, "Barclays Center", 17732, '<img id="window-logo" src="logos/brooklyn_nets.png">', "Brooklyn, New York"], // Brooklyn, New York
    [35.225188, -80.839306, "Charlotte Hornets", 1988, "Spectrum Center", 19077, '<img id="window-logo" src="logos/charlotte_hornets.png">', "Charlotte, North Carolina"], // Charlotte, North Carolina
    [41.880694, -87.674173, "Chicago Bulls", 1966, "United Center", 20917, '<img id="window-logo" src="logos/chicago_bulls.png">', "Chicago, Illinois"],
    [41.496482, -81.688214, "Cleveland Cavaliers", 1970, "Rocket Mortgage FieldHouse", 20562, '<img id="window-logo" src="logos/cleveland_cavs.png">', "Cleveland, Ohio"],
    [32.790727, -96.811091, "Dallas Mavericks", 1980, "American Airlines Center", 19200, '<img id="window-logo" src="logos/dallas_mavs.png">', "Dallas, Texas"], // 
    [39.748663, -105.007710, "Denver Nuggets", 1967, "Pepsi Center", 19520, '<img id="window-logo" src="logos/denver_nuggets.png">', "Denver, Colorado"],
    [42.341011, -83.054971, "Detroit Pistons", 1941, "Little Caesars Arena", 20491, '<img id="window-logo" src="logos/detroit_pistons.png">', "Detroit, Michigan"],
    [37.750305, -122.202961, "Golden State Warriors", 1946, "Oracle Arena", 19596, '<img id="window-logo" src="logos/gs_warriors.png">', "Oakland, California"],
    [29.750764, -95.362101, "Houston Rockets", 1967, "Toyota Center", 18500, '<img id="window-logo" src="logos/houston_rockets.png">', "Houston, Texas"],
    [39.763890, -86.155460, "Indiana Pacers", 1967, "Bankers Life Fieldhouse", 20000, '<img id="window-logo" src="logos/indiana_pacers.png">', "Indianapolis, Indiana"],
    [34.043027, -118.267254, "Los Angeles Clippers", 1970, "Staples Center", 18997, '<img id="window-logo" src="logos/la_clipers.png">', "Los Angeles, California"],
    [34.043497, -118.267447, "Los Angeles Lakers", 1947, "Staples Center", 18997, '<img id="window-logo" src="logos/la_lakers.png">', "Los Angeles, California"],
    [35.138256, -90.050503, "Memphis Grizzlies", 1995, "FedEx Forum", 18119, '<img id="window-logo" src="logos/memphis_grizzlies.png">', "Memphis, Tennessee"],
    [25.781424, -80.186969, "Miami Heat", 1988, "American Airlines Arena", 19600, '<img id="window-logo" src="logos/miami_heat.png">', "Miami, Florida"],
    [43.045052, -87.916793, "Milwaukee Bucks", 1968, "Fiserv Forum", 17500, '<img id="window-logo" src="logos/mil_bucks.png">', "Milwaukee, Wisconsin"],
    [44.979318, -93.275697, "Minnesota Timberwolves", 1989, "Target Center", 19356, '<img id="window-logo" src="logos/min_wolves.png">', "Minneapolis, Minnesota"],
    [29.949038, -90.082055, "New Orleans Pelicans", 1988, "Smoothie King Center", 16867, '<img id="window-logo" src="logos/no_pelicans.png">', "New Orleans, Louisiana"],
    [40.750517, -73.993439, "New York Knicks", 1946, "Madison Square Garden", 19812, '<img id="window-logo" src="logos/ny_knicks.png">', "New York City, New York"],
    [35.463444, -97.515096, "Oklahoma City Thunder", 1967, "Chesapeake Energy Arena", 18203, '<img id="window-logo" src="logos/okc_thunder.png">', "Oklahoma City, Oklahoma"],
    [28.539229, -81.383856, "Orlando Magic", 1989, "Amway Center", 18846, '<img id="window-logo" src="logos/orlando_magic.png">', "Orlando, Florida"],
    [39.901311, -75.171957, "Philadelphia 76ers", 1946, "Wells Fargo Center", 20478, '<img id="window-logo" src="logos/phi_sixers.png">', "Philadelphia, Pennsylvania"],
    [33.445742, -112.07120, "Phoenix Suns", 1968, "Talking Stick Resort Arena", 18422, '<img id="window-logo" src="logos/phoenix_suns.png">', "Phoenix, Arizona"],
    [45.531929, -122.666866, "Portland Trailblazers", 1970, "Moda Center", 19393, '<img id="window-logo" src="logos/portland_blazers.png">', "Portland, Oregon"],
    [29.427153, -98.437490, "San Antonio Spurs", 1967, "AT&T Center", 18581, '<img id="window-logo" src="logos/sa_spurs.png">', "San Antonio, Texas"],
    [38.580213, -121.49966, "Sacramento Kings", 1923, "Golden 1 Center", 17608, '<img id="window-logo" src="logos/sacramento_kings.png">', "Sacramento, California"],
    [43.643505, -79.379106, "Toronto Raptors", 1995, "Scottiabank Arena", 19800, '<img id="window-logo" src="logos/toronto_raptors.png">', "Toronto, Ontario"],
    [40.768298, -111.901088, "Utah Jazz", 1974, "Vivint Smart Home Arena", 18306, '<img id="window-logo" src="logos/utah_jazz.png">', "Salt Like City, Utah"],
    [38.898114, -77.020992, "Washington Wizards", 1961, "Capital One Arena", 20356, '<img id="window-logo" src="logos/washington_wizards.png">', "Washington, District of Columbia"],
];


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: 38, lng: -95 }, // Center is a set so all markers show when map is rendered 
    });
    setMarkers(map, locations);
}

function setMarkers(map, locations) {

    var marker, i;

    for (i = 0; i < locations.length; i++) { // Loop for all markers settings

        var lat = locations[i][0]; // lat & long take co-ordinates for markers form locations var above
        var long = locations[i][1];
        var team = locations[i][2]; // Rest of vars here take data for content of info window on markers
        var yearFounded = locations[i][3];
        var venueName = locations[i][4];
        var venueCapacity = locations[i][5];
        var teamLogo = locations[i][6];
        var teamCity = locations[i][7];

        latlngset = new google.maps.LatLng(lat, long); // Uses vars above to set co-ordinates for each marker 

        var markerTitle = team + " @ " + teamCity; // Content for marker title shown when hover over

        var imagePath = "logos/nba_logo.png"; // Path for image replacing original map markers

        var markerImage = new google.maps.MarkerImage(imagePath, // Replaces original markers with nba logo
            new google.maps.Size(13, 32));



        var marker = new google.maps.Marker({ // Sets markers on map
            map: map,
            title: markerTitle,
            icon: markerImage,
            position: latlngset
        });


        var content = teamLogo + "<br>" + // Creates content for info windows shown when clicking on marker
            "<strong>Team: </strong>" + team + "<br>" +
            "<strong>Founded in: </strong>" + yearFounded + "<br>" +
            "<strong>Venue: </strong>" + venueName + "<br>" +
            "<strong>Capacity: </strong>" + venueCapacity + " people" + "<br>";

        var infowindow = new google.maps.InfoWindow() // Creates info window

        google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
            return function() { // Event listener for when a marker is clicked...
                infowindow.setContent(content); // ... gets what there is in var content and puts it in an info window...
                infowindow.open(map, marker); // ... and opens the info window related to that marker
            };
        })(marker, content, infowindow));
    }


}



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
        .yAxisLabel("Number of players")
        .elasticY(true)
        .yAxis().ticks;
}

// -------------------------------------------------- PLAYERS BY AGE ROW CHART ------------------------------------------

function player_by_age(ndx) {
    var age_dim = ndx.dimension(dc.pluck("players__player__age"));
    var age_group = age_dim.group().reduceCount();

    var minAge = age_dim.bottom();
    var maxAge = age_dim.top();

    dc.rowChart("#player-by-age")
        .width(600)
        .height(600)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(age_dim)
        .group(age_group)
        .transitionDuration(500)
        .x(d3.scale.linear().domain([minAge, maxAge]))
        // .xAxisLabel("Age")
        // .yAxisLabel("Number of players")
        .elasticX(true);
        // .brushOn(false);


}

// ------------------------------------------------- PLAYERS BY DRAFT YEAR SCATTER PLOT ------------------------


function player_by_draft_year(ndx) {
    var draftYear_dim = ndx.dimension(dc.pluck("players__player__draft__year"));
    var ageVsDraft_dim = ndx.dimension(function(d) {
        return [d.players__player__draft__year, d.players__player__age];
    });
    
    var ageVsDraft_group = ageVsDraft_dim.group();

    var minYear = draftYear_dim.bottom();
    var maxYear = draftYear_dim.top();

    dc.scatterPlot("#player-by-draft-year")
        .width(800)
        .height(500)
        .x(d3.scale.linear().domain([1997, 2019]))
        .y(d3.scale.linear().domain([15, 45]))
        .yAxisLabel("Age")
        .xAxisLabel("Year")
        .dimension(ageVsDraft_dim)
        .group(ageVsDraft_group)
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10);
}

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
