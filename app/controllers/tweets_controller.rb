class TweetsController < ApplicationController

	def show
		user = User.find(session[:user_id])
		tweets = user.tweets

		data={
			name: 'tweets',
			children: tweets
		}

		render :json => data.to_json
	end

end