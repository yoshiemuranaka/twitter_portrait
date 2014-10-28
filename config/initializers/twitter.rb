require 'twitter'

$twitter = Twitter::REST::Client.new do |config|
  config.consumer_key = ENV["TWITTER_KEY"]
  config.consumer_secret = ENV["TWITTER_SECRET"]
end
