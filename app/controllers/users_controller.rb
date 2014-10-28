class UsersController < ApplicationController

	def update
		user = User.find(session[:user_id])
		user.update(params['user_params'])
		
		redirect_to '/account'
	end

end