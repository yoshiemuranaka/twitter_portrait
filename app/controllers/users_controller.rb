class UsersController < ApplicationController

	def create

		if params[:password] == params[:password_confirm]
			user = User.create(
				fname: params[:fname],
				lname: params[:lname],
				handle: params[:handle],
				email: params[:email],
				password: params[:password]
				)

			# AJAX TWITTER API AND STORE TWEETS NOW --filter logic

			redirect_to '/'
		else
			@password_error = true
			redirect_to '/account/new'
		end
	end


end