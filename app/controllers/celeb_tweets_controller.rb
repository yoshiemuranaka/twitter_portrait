class CelebTweetsController < ApplicationController

	def show
		celeb = Celeb.find(params[:id])
		tweets = celeb.celeb_tweets

		data={
			name: 'tweets',
			children: tweets
		}

		render :json => data.to_json
	end

	def create

		celeb = Celeb.find(params[:id])

		twitterAPI = $twitter.user_timeline(celeb.handle, :count => 200)

		twitterAPI.each do |tweet|
			
			value = 1
			# ADDING VALUE FOR CHAR # AND @
			tweet.text.split('').each do |char|
				if char == '#'
					value += 5
				elsif char == '@'
					value += 10
				end
			end

			# ADDING VALUE FOR LINKS
			if tweet.text.include?('http')
				value += 20
			end
			
			# CREATING TWEET OBJECT
			time = tweet.created_at

			CelebTweet.create(
				celeb_id: celeb.id,
				tweet_created_at: time.strftime("%Y-%m-%d %H:%M:%S"),
				text: tweet.text,
				value: value, 
				color_code: time.hour
				)
		end
	
	end

end