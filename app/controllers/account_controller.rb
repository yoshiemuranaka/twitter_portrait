class AccountController < ApplicationController

	def show
		if session[:user_id]
			@user = User.find(session[:user_id])
			render :show
		else
			redirect_to '/'
		end
	end

	def new
		render :new
	end

end