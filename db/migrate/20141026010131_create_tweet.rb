class CreateTweet < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
    	t.integer :user_id
    	t.string :created_at
    	t.string :text
    	t.integer :value
    	t.integer :color_code

    	t.timestamps
    end
  end
end
