require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var colors = require('colors');

function menu() {
inquirer
 .prompt([
            {
                type: "list",
                message: colors.green("What would you like me do?"),
                choices: ["spotify a song info", "Up coming artists performances", "Movie info", "tell me a joke", "Exit"],
                name: "choices"
                
            },
            ])
.then(function (inquirerResponse) {
if (inquirerResponse.choices == "spotify a song info") {
    inquirer
    .prompt([
            {
                type: "input",
                message: colors.green("What song do you want to know about?"),
                name: "songInfo"
            }
         ])
.then(function (response) {
spotify.search({ type: 'track', query: response.songInfo }, function (err, data) {
if (err) {
return console.log('Error occurred: ' + err);}

console.log(colors.blue("\nThe name of the artist for this song is") + " " + colors.yellow(data.tracks.items[0].artists[0].name + "\n"));
console.log(colors.blue("\nThe name of this song is") + " " + colors.yellow(response.songInfo + "\n"));
console.log(colors.blue("\nThe name of the album for this song") + " " + colors.yellow(data.tracks.items[0].album.name + "\n"));
    if (data.tracks.items[0].preview_url !== null) {
        console.log("\nHere is a" + " " + colors.magenta("preview") + " " + "for this song ");
        console.log(colors.blue("\nIf your are using a") + " " + (colors.yellow("Mac")) + " " + (colors.blue("do")) + " " + (colors.yellow("Cmd + click")) + " " + (colors.blue("on the link to checkout the album")));
        console.log(colors.yellow("OR"));
        console.log(colors.blue("just copy the link bellow and paste it on your web browser\n"));
        console.log(colors.yellow(data.tracks.items[0].preview_url + "\n"));
menu();}
                            
    if (data.tracks.items[0].preview_url === null) {
inquirer
.prompt([
    {
    type: "list",
    message: colors.green("Unfortunately there is no preview for this song.\nWould you like to checkout the album for this song?\n"),
    choices: ["Yes please!", "No thanks"],
    name: "checkoutAlbum"
    }
        ])
.then(function (response) {
    if (response.checkoutAlbum == "Yes please!"){
        console.log(colors.blue("\nIf your are using a") + " " + (colors.yellow("Mac")) + " " + (colors.blue("do")) + " " + (colors.yellow("Cmd + click")) + " " + (colors.blue("on the link to checkout the album")));
        console.log(colors.yellow("OR"));
        console.log(colors.blue("just copy the link bellow and paste it on your web browser\n"));
        console.log(colors.yellow(data.tracks.items[0].external_urls.spotify + "\n"));
menu();}
    else {
        var lines = process.stdout.getWindowSize()[1];
        for (var i = 0; i < lines; i++) {
        console.log('\r\n');            }
menu();
}  });  }  });  })  }
// ****************** *BandsInTown ***************************ll
    if (inquirerResponse.choices == "Up coming artists performances") {
    inquirer
    .prompt([
    {
        type: "input",
        message: colors.green("Up comning performance for what artist?"),
        name: "bandInfo"
    }
    ])
.then(function (response) {
    var bandsInTown = "https://rest.bandsintown.com/artists/" + response.bandInfo + "/events?app_id=codingbootcamp"
    var axios = require("axios");
    axios
        .get(bandsInTown)
        .then(function (response) {
            console.log(colors.blue("\nThe Venue name is") + " " + (colors.yellow(response.data[0].venue.name + "\n")));
            console.log(colors.blue("\nThis concert is happening in the city of ") + " " + (colors.yellow(response.data[0].venue.city + "\n")));
            console.log(colors.blue("\nThe date for this concert is ") + " " + (colors.yellow(moment(response.data[0].datetime).format("MM-DD-YYYY") + "\n")));
menu(); })

.catch(function (error) {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
} else if (error.request) {
                                    
        console.log(error.request);
        } else {
        console.log("Error", error.message);
        }console.log(error.config);
}); }) }
// ****************** *Append ***************************ll
if (inquirerResponse.choices == inquirerResponse.choices) {
    var fs = require("fs");
    var text = inquirerResponse.choices;
    fs.appendFile("log.txt", text, function(err) {
if (err) {
    console.log(err); }  });  };
// *****************  Movie Info  ********************************ll
if (inquirerResponse.choices == "Movie info") {
    inquirer
    .prompt([
            {
                type: "input",
                message: colors.green("What Movie do you want to know about?"),
                name: "movieInfo"
            } ])
.then(function (response) {
                       
    var queryUrl = "http://www.omdbapi.com/?t=" + response.movieInfo + "&y=&plot=short&apikey=trilogy"
    var axios = require("axios");
                       
 axios
    .get(queryUrl)
    .then(function (response) {
        console.log(colors.blue("\nTitle of the Movie is") + " " + (colors.yellow(response.data.Title + "\n")));
        console.log(colors.blue("\nYear the movie came out: ") + " " + (colors.yellow(response.data.Year + "\n")));
        console.log(colors.blue("\nIMDB Rating of the movie: ") + " " + (colors.yellow(response.data.imdbRating + "\n")));
        console.log(colors.blue("\nThe movie was produced in ") + " " + (colors.yellow(response.data.Country + "\n")));
        console.log(colors.blue("\nLanguage of the movie: ") + " " + (colors.yellow(response.data.Language + "\n")));
        console.log(colors.blue("\nPlot of the movie: ") + " " + (colors.yellow(response.data.Plot + "\n")));
        console.log(colors.blue("\nActors in the movie: ") + " " + (colors.yellow(response.data.Actors + "\n")));
menu();  })
.catch(function (error) {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log("Error", error.message);
            }
        console.log(error.config); }); }) }
    if (inquirerResponse.choices == "tell me a joke") {
        var lines = process.stdout.getWindowSize()[1];
            for (var i = 0; i < lines; i++) {
            console.log('\r\n');
            var fs = require("fs"); }
            var fs = require("fs");
        fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
        return console.log(error); }
            menu();
            var lines = process.stdout.getWindowSize()[1];
            for (var i = 0; i < lines; i++) {
            console.log('\r\n');
            var fs = require("fs"); }

data
console.log(colors.yellow("\n" + data + "\n"));
var dataArr = data.split(",");  });  }
    if (inquirerResponse.choices == "Exit") {
            var lines = process.stdout.getWindowSize()[1];
            for (var i = 0; i < lines; i++) {
            console.log('\r\n');
            var fs = require("fs"); }
            console.log(colors.yellow.bold("See you next time\n"));  }  });  }

menu();