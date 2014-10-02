class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
    	t.timestamps
    	t.references :user
    	t.references :song
    end
  end
end
