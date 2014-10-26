class AccountController < ApplicationController

	def show
		if session[:user_id]
			@user = User.find(session[:user_id])
			render :show
		else
			redirect_to '/'
		end
	end

	def create

		if params[:password] == params[:password_confirm]
			User.create(
				fname: params[:fname],
				lname: params[:lname],
				handle: params[:handle],
				email: params[:email],
				password: params[:password]
				)
			redirect_to '/'
		else
			@password_error = true
			render :new
		end

	end

	def new
		render :new
	end

end