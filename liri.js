require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var request = require("request");

var getArtistsName = function (artist) {
    return artist.name;
}
