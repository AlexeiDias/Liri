require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
// var spoty = require("./spotify.js");
var inquirer = require("inquirer");
var colors = require('colors');
// Create a "Prompt" with a series of questions.
function menu(){
inquirer
  .prompt([
    {
      type: "list",
      message: colors.green("What would you like me do?"),
      choices: ["spotify a song info", "Up coming artists performances", "Movie info", "tell me a joke","Exit"],
      name: "choices"
    },
  ])
  .then(function(inquirerResponse) {
    // console.log(inquirerResponse);
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.choices == "spotify a song info") {
  inquirer
  .prompt([
    {
      type: "input",
      message: colors.green("What song do you want to know about?"),
      name: "songInfo"
    }
  ])
  .then(function(response){
    // console.log(response.songInfo);
    spotify.search({ type: 'track', query: response.songInfo }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      // console.log(data.tracks.items[0]);
      console.log(colors.blue("\nThe name of the artist for this song is") + " " +colors.yellow( data.tracks.items[0].artists[0].name + "\n"));
      console.log(colors.blue("\nThe name of this song is") + " " + colors.yellow(response.songInfo + "\n"));
      console.log(colors.blue("\nThe name of the album for this song") + " " + colors.yellow(data.tracks.items[0].album.name + "\n"));
      if (data.tracks.items[0].preview_url !== null){
      console.log("\nHere is a" + " " + colors.magenta("preview") + " " + "for this song ");
      console.log(colors.blue("\nIf your are using a") + " " + (colors.yellow("Mac")) + " " + (colors.blue("do"))  + " " + (colors.yellow("Cmd + click")) + " " + (colors.blue("on the link to checkout the album")));
      console.log(colors.yellow("OR"));
      console.log(colors.blue("just copy the link bellow and paste it on your web browser\n"));
      console.log(colors.yellow(data.tracks.items[0].preview_url + "\n"));
      menu();
    }
    //   console.log(colors.yellow(data.tracks.items[0].preview_url + "\n"));
      // console.log(data.tracks.items[0].preview_url);
      if (data.tracks.items[0].preview_url === null){
        // console.log("this is null");
        inquirer
  .prompt([
    {
      type: "list",
      message: colors.green("Unfortunately there is no preview for this song.\nWould you like to checkout the album for this song?\n"),
      choices: ["Yes please!", "No thanks"],
      name: "checkoutAlbum"
    }
  ])
  .then(function(response) {
    // console.log(response.checkoutAlbum);
    // console.log("this is inquirerResponse.confirm above is inquirerResponse " + inquirerResponse.choices);
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (response.checkoutAlbum == "Yes please!") {

        
        console.log(colors.blue("\nIf your are using a") + " " + (colors.yellow("Mac")) + " " + (colors.blue("do"))  + " " + (colors.yellow("Cmd + click")) + " " + (colors.blue("on the link to checkout the album")));
        console.log(colors.yellow("OR"));
        console.log(colors.blue("just copy the link bellow and paste it on your web browser\n"));
        console.log(colors.yellow(data.tracks.items[0].external_urls.spotify + "\n"));
        // console.log(colors.green("\nhave a good day!\n"));
        // var lines = process.stdout.getWindowSize()[1];
        // for(var i = 0; i < lines; i++) {
        // console.log('\r\n');
        
        // }
            menu();
       
    }
    
    else {
        var lines = process.stdout.getWindowSize()[1];
        for(var i = 0; i < lines; i++) {
        console.log('\r\n');
        
        }
            menu();
        
    //   console.log(colors.blue("\nThat's okay , come again when you are more sure.\n"));
      
    }
  });
  // .then(function confirmed(){
    
    
  //   console.log(colors.blue("\nIf your are using a") + " " + (colors.yellow("Mac")) + " " + (colors.blue("do"))  + " " + (colors.yellow("Cmd + click")) + " " + (colors.blue("on the link to checkout the album")));

  //   console.log(colors.yellow("OR"));
  //   console.log(colors.blue("just copy the link bellow and paste it on your web browser\n"));
  //     console.log(colors.yellow(data.tracks.items[0].external_urls.spotify + "\n"));
  //     console.log(colors.green("\nhave a good day!\n"));
    

  // })
      }
     
    });
  })
}
// *********************************************************ll
    if (inquirerResponse.choices == "Up coming artists performances") {
      inquirer
      .prompt([
        {
          type: "input",
          message: colors.green("Up comning performance for what artist?"),
          name: "bandInfo"
        }
      ])
      .then(function(response){
        // console.log(response.bandInfo);
       
        var bandsInTown = "https://rest.bandsintown.com/artists/" + response.bandInfo + "/events?app_id=codingbootcamp"
        var axios = require("axios");
        // console.log(bandsInTown);
// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
axios
  .get(bandsInTown)
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    // console.log(response.data);
    
      console.log(colors.blue("\nThe Venue name is") + " " + (colors.yellow(response.data[0].venue.name + "\n")));

      console.log(colors.blue("\nThis concert is happening in the city of ") + " " + (colors.yellow(response.data[0].venue.city + "\n")));

      
      console.log(colors.blue("\nThe date for this concert is ") + " " + (colors.yellow(moment(response.data[0].datetime).format("MM-DD-YYYY") + "\n")));
      menu();
    })
  
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
      })
        }
// *****************************************************************ll
if (inquirerResponse.choices == "Movie info") {
    inquirer
    .prompt([
      {
        type: "input",
        message: colors.green("What Movie do you want to know about?"),
        name: "movieInfo"
      }
    ])
    .then(function(response){
      // console.log(response.movieInfo);
      // console.log("1this is for thebug");
      // console.log("2another line for debug");
     
      
      // Then run a request with axios to the OMDB API with the movie specified
      // console.log("3another line for debug");
      var queryUrl = "http://www.omdbapi.com/?t=" + response.movieInfo + "&y=&plot=short&apikey=trilogy"
      var axios = require("axios");
      // console.log("4 another line for debug");
      // This line is just to help us debug against the actual URL.
      // console.log(queryUrl);
      
      axios
      .get(queryUrl)
      .then(function(response) {
          console.log(colors.blue("\nTitle of the Movie is") + " " + (colors.yellow(response.data.Title + "\n")));

          console.log(colors.blue("\nYear the movie came out: ") + " " + (colors.yellow(response.data.Year + "\n")));

          console.log(colors.blue("\nIMDB Rating of the movie: ") + " " + (colors.yellow(response.data.imdbRating + "\n")));

          console.log(colors.blue("\nThe movie was produced in ") + " " + (colors.yellow(response.data.Country + "\n")));

          console.log(colors.blue("\nLanguage of the movie: ") + " " + (colors.yellow(response.data.Language + "\n")));

          console.log(colors.blue("\nPlot of the movie: ") + " " + (colors.yellow(response.data.Plot + "\n")));

          console.log(colors.blue("\nActors in the movie: ") + " " + (colors.yellow(response.data.Actors + "\n")));
          // console.log(response);
          menu();
        })
.catch(function(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an object that comes back with details pertaining to the error that occurred.
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
});
    })
      }
       
            if (inquirerResponse.choices == "tell me a joke") {
                var lines = process.stdout.getWindowSize()[1];
        for(var i = 0; i < lines; i++) {
        console.log('\r\n');
        var fs = require("fs");
        
        }
              // console.log("random.txt here");
              // fs is a core Node package for reading and writing files
var fs = require("fs");

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }
  menu();

  // We will then print the contents of 
  data
  console.log(colors.blue("\n" + data + "\n"));

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  // console.log(dataArr);

});
                }
                if (inquirerResponse.choices == "Exit") {
                    var lines = process.stdout.getWindowSize()[1];
                    for(var i = 0; i < lines; i++) {
                    console.log('\r\n');
                    var fs = require("fs");
            
                }
                    console.log(colors.yellow.bold("See you next time\n"));
                  // console.log("random.txt here");
                  // fs is a core Node package for reading and writing files
    
    
    // This block of code will read from the "movies.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
   
                    }
  });
}
menu();