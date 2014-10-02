class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
    	t.timestamps
    	t.references :users
    	t.references :songs
    end
  end
end
