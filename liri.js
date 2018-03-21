
require("dotenv").config();

// Import and store the `keys.js` file in a variable.
var keys = require("keys.js");


// Variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var title = process.argv[3];

// Switch statements that take in the commands.
swicth(action) {
    case "my-tweets":
  myTweets();
  break;
    
    case "spotify-this-song":
  spotifyThisSong();
  break;
    
    case "movie-this":
  movieThis();
  break;

    case "do-what-it-says":
  doWhatItSays();
  break;
};

function myTweets() {
  
}

