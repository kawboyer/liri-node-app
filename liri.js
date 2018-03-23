
require("dotenv").config();

// Require the npm packages
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");
var fs = require("fs");

// Import and store the "keys.js" file in a variable.
var keys = require("./keys.js");

// Store all of the arguments in an array (if using process.argv)
//var nodeArgs = process.argv;
//var action = process.argv[2];
//var title = process.argv[3];

// Promt the user to make a choice
inquirer.prompt([
  {
    type: "list",
    message: "What would you like to see?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
    name: "answers"
  }
]).then(function (action) {

  // Switch statements that take in the commands
  switch (action.answers) {
    case "my-tweets":
      tweet();
      break;

    case "spotify-this-song":
      song();
      break;

    case "movie-this":
      movie();
      break;

    case "do-what-it-says":
      random();
      break;
  };
});

function tweet() {

  var client = new Twitter(keys.twitter);
  var params = { screen_name: 'nodejs' };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      //console.log(JSON.stringify(tweets, null, 4))

      console.log("");
      
      console.log("");
      console.log("HERE ARE MY 20 MOST RECENT TWEETS:");
      console.log("");
      console.log("==============================================================")

      for (var i = 0; i < tweets.length; i++) {
        console.log("");
        console.log("Tweet " + (i + 1) + ": " + tweets[i].text);
        console.log("");
        console.log("Created at: " + tweets[i].created_at);
        console.log("");
        console.log("------------------------------------------------------------");
        ;
      };
    }
  });
};

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
    console.log("Song title: " + input.toUpperCase());

    // Connecting to keys for Spotify
    var spotify = new Spotify(keys.spotify);

    if (input === "") {
      song = "The Sign";
    }
    else {
      song = input;
    }

    spotify.search({ type: "track", query: song}, function (err, data) {
      console.log(data.tracks);
      if (err) {
        return console.log("Error occurred: " + err);
      }

      var data = data.tracks.items[0];
      console.log("Song info: " + data);

      //console.log(songInfo); 

      console.log("");
      console.log("------------------------------------------------------------");
      console.log("");
      console.log("MORE DETAILS ABOUT THE SONG: " + song.toUpperCase());
      console.log("");
      console.log("\nArtists: " + JSON.parse(data).artists.name);
      console.log("Song: " + JSON.parse(data).name);
      console.log("A preview link of the song from Spotify: " + JSON.parse(data).external_urls[0]);
      console.log("Album: " + JSON.parse(data).album.name);
      console.log("");
      console.log("------------------------------------------------------------");

    });
  });
};

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
      console.log("MORE DETAILS ABOUT THE MOVIE: " + movie.toUpperCase());
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

function random() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    var songInput = data;
    var song = songInput;
  
    //song();

    console.log("What is data: " + data);
  });
};