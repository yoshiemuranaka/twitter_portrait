class CreateCelebTweet < ActiveRecord::Migration
  def change
    create_table :celeb_tweets do |t|
    	t.string :text
    	t.integer :value
    	t.string :tweet_created_at
    	t.integer :color_code

    	t.timestamps
    end
  end
end
