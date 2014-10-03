class AddTrackToPlaylists < ActiveRecord::Migration
  def change
  	change_table :playlists do |t|
  		t.string :artist
  		t.string :track
  		t.remove :song_id
  	end
  end
end
