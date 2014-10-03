class PlaylistsController < ApplicationController

	before_action :authenticate_user!

	def index
		@playlists = Playlist.where(user_id: current_user.id)
	end

	def create
		  @playlist = Playlist.new(playlist_params)
		  @playlist.user_id = current_user.id 
		if @playlist.save
			redirect_to @playlist
		end
	end

	def new
		@playlist = Playlist.new
	end

	def edit
	end

	def show
		
	end

	def update
	end

	def destroy
	end

private

def playlist_params
	params.require(:playlist).permit(:track, :artist)
end

end