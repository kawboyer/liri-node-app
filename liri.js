
require("dotenv").config();

var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");

// Import and store the `keys.js` file in a variable.
var keys = require("./keys.js");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var action = process.argv[2];
var title = process.argv[3];

inquirer.prompt([
  {
    type: "list",
    message: "What would you like to see?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
    name: "answers"
  }
]).then(function (action) {
  //console.log(JSON.stringify(action, null, 4));
  //console.log(action);
  // Switch statements that take in the commands. 
  switch (action.answers) {
    case "my-tweets":
      tweet();
      break;

    case "spotify-this-song":

      break;

    case "movie-this":
      movie();
      break;

    case "do-what-it-says":
      inquirer();
      break;

  };
});
function song() {
  inquirer.prompt([
    {
      type: "input",
      message: "Which song would you like to see more details about?",
      name: "name"
    },
  ]).then(function (response) {
    var input = response.name;
    var song;

    if (input === "") {
      song = "The Sign";
    }
    else {
      song = input;
    }
  


  });
}



function movie() {
  inquirer.prompt([
    {
      type: "input",
      message: "Which movie would you like to see more details about?",
      name: "name"
    },
  ]).then(function (response) {
    var input = response.name;
    var movie;

    // Default movie title is "Mr Nobody" if user fails to provide an input.
    if (input === "") {
      movie = "Mr Nobody";
    }
    else {
      movie = input;
    }

    // Initiate query to OMDB API.
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    // Request and print the outputs from the query
    request(queryURL, function (error, response, body) {
      console.log("");
      console.log("------------------------------------------------------------");
      console.log("");
      console.log("MORE DETAILS ABOUT THE MOVIE " + movie.toUpperCase());
      console.log("\nTitle: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Production Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("");
      console.log("------------------------------------------------------------");
    });
  })
};
