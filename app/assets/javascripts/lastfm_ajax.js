var apiKey = "b69b2078d241e58db6e23387b9b495fc";
var artist = "Pink Floyd";
var limit = 10;
var track = "";
var trackId = "6Rcv8LeOnK2i2MZ19n2fl4";

// get related tracks
function lastFMRelated(track, limit){
	var relatedTracks = [];
	$.ajax({
		url: "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artist + "&track=" + track + "&api_key=" + apiKey + "&format=json&limit=" + limit,
		method: "GET",
		dataType: 'json',
		success: function(data){
			// console.log(data);
			for (var i = 0; i < data.similartracks.track.length; i++){
				// relatedTracks.push(data.similartracks.track[i].name);
				spotifyResults(data.similartracks.track[i].name);
			}
		}
	});
}

// get results for a track search
function spotifyResults(query){
	$.ajax({
		url: "https://api.spotify.com/v1/search?query=" + query +"&offset=0&limit=20&type=track",
		method: "GET",
		dataType: 'json',
		success: function(data){
			for (var i = 0; i < 4; i++){
				console.log(data.tracks.items[i].id);
				var trackId = data.tracks.items[i].id;
				$("body").append("<iframe src='https://embed.spotify.com/?uri=spotify:track:" + trackId + "' frameborder='0' allowtransparency='true' width='622' height='702'></iframe>");
			}
		}
	});
}

// get a specific song form spotify
function spotifyTrackById(){
	$.ajax({
		url: "https://api.spotify.com/v1/tracks/" + trackId,
		method: "GET",
		dataType: 'json',
		success: function(data){
			console.log(data);
		}
	})
}

$("#search").on('click', function(){
	lastFMRelated("Hey You", 10);
});

