class UsersController < ApplicationController

	def update
		user = User.find(session[:user_id])

		binding.pry

	end

end