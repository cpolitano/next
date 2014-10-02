class PlaylistsController < ApplicationController

	before_action :authenticate_user!

	def index
		@playlists = Playlist.where(user_id: current_user.id)
	end

	def create
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

end