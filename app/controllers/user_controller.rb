class UserController < ApplicationController

	def index

		tweets = Tweet.where(user_id: session[:user_id])
		render :json => tweets

	end

end