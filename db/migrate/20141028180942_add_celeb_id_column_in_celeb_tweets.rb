class AddCelebIdColumnInCelebTweets < ActiveRecord::Migration
  def change
  	add_column :celeb_tweets, :celeb_id, :integer
  end
end
