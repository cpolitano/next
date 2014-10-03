var apiKey = "b69b2078d241e58db6e23387b9b495fc";

// get related tracks
function lastFMRelated(query, artist, limit){
	$(".history").remove();
	var relatedTracks = [];
	$.ajax({
		url: "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artist + "&track=" + query + "&api_key=" + apiKey + "&format=json&limit=" + limit,
		method: "GET",
		dataType: 'json',
		success: function(data){
			for (var i = 0; i < data.similartracks.track.length; i++){
				spotifyResults(data.similartracks.track[i].name, i);
			}
		}
	});
}


// get results for a track search
function spotifyResults(query, index){
	$.ajax({
		url: "https://api.spotify.com/v1/search?query=" + query +"&offset=0&limit=1&type=track",
		method: "GET",
		dataType: 'json',
		success: function(data){
			for (var i = 0; i < data.tracks.items.length; i++){
				var trackId = data.tracks.items[i].id;
				$(".pl-players").append("<div id='" + index + "' class='pl-embed pl-hidden'><iframe src='https://embed.spotify.com/?uri=spotify:track:" + trackId + "' frameborder='0' allowtransparency='true' width='500' height='450'></iframe></div>");
			}
		}
	});
}

function getSearches(){
	$(".container").append("<div class='history'></div>")
	$.ajax({
		url: "/playlists",
		dataType: "json",
		method: "GET",
		success: function(data){
			for (var i = 0; i < data.length; i++){
				stringVar = "Artist: " + data[i].artist + ", Track: " + data[i].track
				$(".history").append("<li artist='" + data[i].artist+ "' track='" + data[i].track + "' ><a href='#'>" + stringVar + "</a></li>");
			}
		}
	})
	$(".history").css("margin-top", "25%");
}

function saveSearch(artistVar, trackVar){
	$.ajax({
		url: '/playlists',
		method: "POST",
		dataType: "json",
		data: { playlist: {artist: artistVar, track: trackVar }}
	});
}

$("#search").on('submit', function(event){
	event.preventDefault();
	var artist = $("#artist").val();
	var track = $("#track").val();
	saveSearch(artist, track);
	$(".pl-saved").remove();
	$(".container").html("<div class='pl-players'></div>");
	lastFMRelated(track, artist, 10);
	$("#0").removeClass("pl-hidden").addClass("pl-active");
});

$("a").eq(0).on('click', function(event){
	event.preventDefault();
	$(".container").html('<div class="pl-saved"><h2 class="pl-h2">Search for a Track</h2><form id="search"><label for="track">Track</label><input type="search" id="track"><br><label for="artist">Artist</label><input type="search" id="artist"><br><input type="submit" value="Search"></form>');
});

getSearches();

$(".history li").on('click', function(event){
	event.preventDefault();
	artist = $(this).parent().attr("artist");
	track = $(this).parent().attr("track");
	$(".pl-saved").remove();
	$(".container").html("<div class='pl-players'></div>");
	lastFMRelated(track, artist, 10);
});

