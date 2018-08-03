var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
var command = process.argv[2];
var titles = process.argv[3];


switch (command) {
    case "spotify-this-song":
        getSpotify();
        break;
    case "movie-this":
        getMovie();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default: console.log("That is not a valid command");
}

function getSpotify() {
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    var songTitle = titles;

    if (!songTitle) {
        songTitle = "The Sign";
    }

    var songName = songTitle;
    spotify.search({ type: 'track', query: songName }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log("Searched: " + songName.toUpperCase());
            console.log("\n------------Song Description-----------\n");
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song Name: " + songName);
            console.log("Spotify preview link: " + data.tracks.items[0].album.external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
            

        }
    });
}


function getMovie() {    
    var omdb = keys.omdbKey.key;
    var movieTitle = titles;

    if (!movieTitle) {
        movieTitle = "mr nobody";
    }

    var name = movieTitle;
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + omdb, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            console.log("\n ====  YOUR MOVIE ====\n");
            console.log("Movie Title: " + data.Title);
            console.log("Release Year: " + data.Year);
            console.log("IMDB Rating: " + data.Ratings[0].Value);
            console.log("Rotten Tomato Rating: " + data.Ratings[1].Value);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
        } else {
            console.log('error:', error);
            return;
        }
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {
            var dataArr = data.split(",");
            var randomCommand = dataArr[0];
            var randomTitle = dataArr[1];

            switch (randomCommand) {
                case "spotify-this-song":
                    titles = randomTitle;
                    getSpotify();
                    break;
                case "movie-this":
                    titles = randomTitle;
                    getMovie();
                    break;
                default: console.log("That is not a valid command.");
            }
        } else {
            throw error;
        }
    });
}

