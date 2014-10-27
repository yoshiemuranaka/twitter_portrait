require 'twitter'

# key = File.read('./.key')
# secret = File.read('./.secret')

$twitter = Twitter::REST::Client.new do |config|
  config.consumer_key = "4ZDUQyMrN668ytZv4Xf2CIVZA"
  config.consumer_secret = "C7cjZp7hc444XrZibJNRIPMNzFqv2TAO8REkqtpd105uhowy5j"
end
