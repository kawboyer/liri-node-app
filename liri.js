
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
  console.log(JSON.stringify(action, null, 4));
  console.log(action);

  // Switch statements that take in the commands. 
  switch (action.answers) {
    case "my-tweets":
      tweet();
      break;

    case "spotify-this-song":
        inquirer.prompt([
          {
            type: "input",
            message: "What song would you like to see more details about?",
            name: "songInput"
          },
        ]).then(function (response) {

          song(response.songInput, "string");
            console.log(response.songInput);
        });
      break;

    case "movie-this":
      if (choice === "movie-this") {
        inquire.promt([
          {
            type: "input",
            message: "What movie would you like to see more details about?",
            name: "movie"
          },
        ]);
      };
      movie();
      break;

    case "do-what-it-says":
      inquirer();
      break;
  };
});

//function tweet() {
//};

function song(unicorn, test) {
console.log("this is a test: " + test)
};

// Query to OMDB API

var queryURL = "http://www.omdbapi.com/?t=" + title + "&apikey=trilogy"
//console.log(queryURL);

//function movie() {}

  request(queryURL, function (error, response, body) {

  if (!error && response.statusCode === 200) {
    /*
    for (var i = 1; i < nodeArgs.length; i++) {

      if (i > 1 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[2];
      }
      if (i = 1) {
        movieName += nodeArgs[2];
      }
      else if (nodeArgs[2] === undefined || nodeArgs[2] === " ") {
        movieName = "Mr Nobody";
      }
      else {
        movieName = nodeArgs[2];
      }
      */


    console.log("\nTitle: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    //console.log("OMDB Rating: " + JSON.parse(body).Ratings[0].Value);
    //console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Rating[1].Value);
    console.log("Production Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);

  };
});