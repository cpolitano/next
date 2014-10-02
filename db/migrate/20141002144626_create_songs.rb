class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
    	t.string "title"
    	t.string "artist"
    	t.string "album"
    	t.string "album_img"
    	t.string "url"
    end
  end
end
