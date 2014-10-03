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
				$(".pl-players").append("<div id='" + index + "' class='pl-embed pl-hidden'><iframe src='https://embed.spotify.com/?uri=spotify:track:" + trackId + "' frameborder='0' allowtransparency='true' width='500' height='450'></iframe><button class='pl-previous'>Prev.</button><button class='pl-next'>Next</button></div>");
				$(".pl-previous").on('click', prevTrack);
				$(".pl-next").on('click', nextTrack);
			}
		}
	});
}

function nextTrack(){
	console.log($(this))
	$(this).parent().removeClass("pl-active")
	$(".pl-embed").eq( parseInt($(this).attr("id")) + 1).addClass("pl-active")
}

function prevTrack(){
	console.log($(this).parent())
	$(this).removeClass("pl-active")
	$(".pl-embed").eq( parseInt($(this).attr("id")) - 1).addClass("pl-active")
}

$("#search").on('submit', function(event){
	event.preventDefault();
	var artist = $("#artist").val();
	var track = $("#track").val();
	$(".pl-saved").remove();
	$(".container").html("<div class='pl-players'></div>");
	lastFMRelated(track, artist, 10);
	$("#0").removeClass("pl-hidden").addClass("pl-active");
});

