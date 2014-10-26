class TweetsController < ApplicationController

	def show
		user = User.find(session[:user_id])
		tweets = user.tweets

		render :json => tweets
	end

end