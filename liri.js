require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var request = require("request");

var getArtistsName = function (artist) {
    return artist.name;
}

var getMeSpotify = function (songName) {

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log("Error " + err);
            return;
        }

        var songs = data.track.items;
        for(var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistsName));
            console.log('song name: ' + songs[i].name);
            console.log('preview song' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('*******************************************************');
        }
    });
}
