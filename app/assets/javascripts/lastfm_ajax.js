var apiKey = "b69b2078d241e58db6e23387b9b495fc";

// get related tracks
function lastFMRelated(query, artist, limit){
	var relatedTracks = [];
	$.ajax({
		url: "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artist + "&track=" + query + "&api_key=" + apiKey + "&format=json&limit=" + limit,
		method: "GET",
		dataType: 'json',
		success: function(data){
			for (var i = 0; i < data.similartracks.track.length; i++){
				spotifyResults(data.similartracks.track[i].name);
			}
		}
	});
}

// get results for a track search
function spotifyResults(query){
	$.ajax({
		url: "https://api.spotify.com/v1/search?query=" + query +"&offset=0&limit=1&type=track",
		method: "GET",
		dataType: 'json',
		success: function(data){
			for (var i = 0; i < data.tracks.items.length; i++){
				var trackId = data.tracks.items[i].id;
				$(".pl-players").append("<div class='pl-embed'><iframe src='https://embed.spotify.com/?uri=spotify:track:" + trackId + "' frameborder='0' allowtransparency='true' width='500' height='450'></iframe><button class='previous'>Prev.</button><button class='next'>Next</button></div>");
				$(".pl-players.next").css({"float":"right","margin-top":"20%", "margin-right": "20%"});
				$(".pl-players.previous").css({"float":"left","margin-top":"20%", "margin-left": "20%"});
				$(".pl-embed").css("display", "none");
			}
		}
	});
}


// $("#new-search").on('click', function(){
	// $(".pl-saved").remove();
	// $(".pl-saved").html("<div class='pl-players'></div>");
// 	var artist = $("#artist").val();
// 	var song = $("#song").val();
// 	lastFMRelated(song, artist, 10)
// });
// $(".pl-saved").remove();
// $(".container").html("<div class='pl-players'></div>");
// lastFMRelated("Hey You", "Pink Floyd", 5);
// $(".pl-embed").eq(1).css("display", "block");

