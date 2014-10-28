require 'twitter'

$twitter = Twitter::REST::Client.new do |config|
  config.consumer_key = Rails.application.secrets.twitter_key || ENV["TWITTER_KEY"]
  config.consumer_secret = Rails.application.secrets.twitter_secret || 	ENV["TWITTER_SECRET"]
end
