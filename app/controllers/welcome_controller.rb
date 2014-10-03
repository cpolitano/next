class WelcomeController < ApplicationController

	def index
		if current_user? 
			redirect_to 'playlists'
		end
	end

end
