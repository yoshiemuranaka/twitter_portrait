require 'twitter'

$twitter = Twitter::REST::Client.new do |config|
  config.consumer_key = Rails.application.secrets.twitter_key
  config.consumer_secret = Rails.application.secrets.twitter_secret
end
