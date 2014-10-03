class WelcomeController < ApplicationController

	def index
		if user_signed_in? 
			redirect_to '/playlists'
		end
	end

end
