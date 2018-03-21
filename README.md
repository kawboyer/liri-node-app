## liri-node-app
LIRI is a _*Language Interpretation and Recognition Interface*_, similarly to how iPhone's SIRI is a Speech Interpretation and Recongnition Interface. LIRI is a command line node app that takes in parameters and gives back data. 

#Directions:
These are the command line commands that can be used and what will be displayed in your terminal/bash window:

1. `node liri.js my-tweets`: Will show the last 20 tweets and when they were created.

2. `node liri.js spotify-this-song '<song name here>'`: Will show the following information about the song:
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

    * The default if no song title is provided, is "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`: Will show the following information about the movie:
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.

    * The default if no movie title is provided, is the movie 'Mr. Nobody.'


This node app uses the following npm's:
* Twitter
* Spotify
* Request
* OMdB
* DotEnv