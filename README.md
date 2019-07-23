# NBA Season 2018/19

NBA Season 2018/19 is a one-page dashboard application used to show and compare different data of teams and players of the National Basketball Association.

The players data displayed on all the different charts is correlated among all of them, allowing the user to either read the data as a whole or filtering it using the different charts to see the data for a specific field (player position, country/state of origin, age, etc.).

## UX

The purpose of this application is to offer the user with some basic data, not in very much depth, about different aspects of the NBA, mainly some generical information about the players but also about the teams, offering at the same time a bit of context to each field to help the user put the data into perspective in order to have a better understanding of it.

Users that have trialed the website have mostly liked the simplicity of its layout and structure, leaving a white background to not confuse with the colours on the different graphs and not using any icons or font colours that could distract the attention from the charts.

They have also found interesting the bit of information provided for each chart, although it does not go too deep or in much detail, it helps the users to put the data into perspective making it easier to digest and learn some facts about it.

The part that has received the more comments is the map marking where all the different venues for each team are located, as it provides a very visual idea how they are spread all accross the country from coast to coast, with teams based almost on all areas of the country.

Another aspect that has received a lot of feedback is how the data is related among the charts, encouraging the user to keep "playing about" clicking on the different fields to compare the data from all of them.

## Features

### Existing features

VENUE LOCATION MAP - This map shows the locations of the venue where each one of the 30 teams in the league play their home games. By clicking on each one of the markers (customised with the league logo), it will open up an info window with some basic information about the team and the venue, displaying the following: team logo, team name, year of foundation of the franchise, name of the venue and its capacity.

CHARTS AND GRAPHS - All the charts and graphics used correlated data, allowing the user to filter data on all of them by clicking on one or multiple fields of each chart.

PLAYERS BY POSITION BAR CHART - This chart distributes the players by their primary position, the position that they normally play as. When hovering over any of the bars, it will display the number of players playing that position. 

PLAYERS BY COUNTRY DONUT CHART - On first deployment, without filtering any data by country or state on the other pie charts, it displays a comparison between players form the USA and players from any other nationality. If the user clicks on any slice of the "Players from the rest of the world" or "Players by state" charts below, the data on this chart will update accordingly. Hovering over any of the slices will display the number of players from that country (or countries).

PLAYERS FROM REST OF THE WORLD PIE CHART -This chart expands the data provided on the previous chart by detailing the nationality of all the players that are not American. As there are some slices of very small size, only the countries represented by the larger slices have a label showing on the chart, as it will look very cluttered and unreadable if showing a label for each one of the slices. 
By hovering over the country names on the legend, it will highlight the corresponding slice on the chart. By hovering over the chart slice, it will display the number of players from that coutnry.

PLAYERS BY STATE PIE CHART - Similar to the "Players from the rest of the world" chart above, this chart expands the data from the "Players by country" chart, but in this instance it sorts the American and Canadian players by the state they were born at, or the province in the case of the Canadian players.
Same as on the other pie chart, by hovering over the state/province names on the legend, it will highlight the corresponding slice on the chart. By hovering over the chart slice, it will display the number of players from that state-province.

PLAYERS BY AGE ROW CHART - It shows how many players are of a certain age. By hovering over each bar, it will display the number of players of that age.
Next to the chart, the user can see the youngest and oldest players in the league just to give a more visual idea of the wide age range.

PLAYERS BY DRAFT YEAR SCATTER PLOT CAHRT - This charts offers a visual perspectivef of the correlation between the age of the players and their years of experience on the league, using the year that they were drafted in to the league as the starting point of their careers in the league. The colours of the dots represent a different number of players with that specific age that were drafted on that year. By hovering over each dot, the user can see more detailed information of what is represented by each one of those dots.

### Features left to implement

On future development and improvement of the application, the user will be able to also filter all the data by individual teams, instead of the global data for the whole league as it is at the moment. Individualising the data by team in oreder to be displayed correctly on the application is a very laborious and time consuming task difficult to afford in terms of time and manpower at this stage.

The current database includes a vast number of fields and information, offering a broad range of opportunities to display and combine this data in many different ways on charts and/or tables. Examples of this are, but not limited to: average height and weight of players, rankings of tallest/shortest players and also heaviest/lighteset players (also applicable to teams), most common jersey number, chart comparing players that come from college league and what college they are from, and also displaying the individual team rosters for each franchise as a table and being able to sort it by any of the fields provided.

## Technologies used

HTML - USed to structure the code of the page, using semantic HTML to give more clarity and order to the page structure.

CSS - Basic CSS to give some style to the different elements of the page.

BOOTSTRAP - CDN used to help build and structure the page offering consistency and some bulit-in items for ease of use. Official website: https://getbootstrap.com/

DC.JS & D3.JS - JavaScript libraries offering built-in elements to facilitate the use of charts and graphics.

CROSSFILTER - Filtering tool used to better filtering and administrating the data used for the application.

GOOGLE MAPS API - Technology used to build the "Venue location map" featuring on the application with some personal customisation for better fitting the purpose of the application. Official website https://cloud.google.com/maps-platform/

## Testing

While testing the application, some issues with displaying the data accurately have been found. The first one, and more obvious, is the number of players from the state of Missouri showing on the "Players by State" pie chart, which is much larger than the corresponding data of the all_teams.json file where all data is coming from. The correct number of players is 9, but for some unknown reason, the chart is displaying 112 players from this state. This has been cross checked on several occasions with the actual data on the json file and no issues with this file have been found and the data in it is correct to this date. This issue have been happening for some time along most part of the developping process, but affecting to different state fields at a time, it was first spotted with a larger number displaying under Louisiana and time after for Massachussetts before being Missouri as it is now.
As it has been mentioned earlier, this issue has been investigated on several opportunities and the font of it has not been found as the data on the json file seems accurate and the data displayed on the chart does not match the one in the file.

Another issue that seems related to the one above, or probably part of the same issue, when filtering the origin of the players by their country of origin, using Australia as an example, on the "Players by state" chart, it shows as if Australian players were also from some US state, which is obviously incorrect. When cross checking the data on the json file, the "players__player__birth_state" field, which indicates were US state the player is originary from, is empty (or "null") for aall the Australian players, so it is unknown where the chart is pulling the incorrect data from. 
This same issue also happens with some other countries different to Australia, but the same details as above apply for them.