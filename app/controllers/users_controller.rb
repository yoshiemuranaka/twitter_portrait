class UsersController < ApplicationController

	def create

		if params[:password] == params[:password_confirm]

			if params[:handle].include?('@')
				params[:handle].slice!(0)
			end

			user = User.create(
				fname: params[:fname],
				lname: params[:lname],
				handle: params[:handle],
				email: params[:email],
				password: params[:password]
				)

			client = $CLIENT
			twitterAPI = client.user_timeline(user.handle, :count => 20)

			twitterAPI.each do |tweet|
				
				value = 0
				tweet.text.split('').each do |char|
					if char == '#' || char == '@'
						value += 3
					end
				end

				if text.include?('http')
					value +=5
				end

				time = Time.new(text.created_at)

				if time.hour == 0 && time.hour < 8
					color_code = 0
				elsif time.hour == 8 && time.hour < 16
					color_code = 1
				else
					color_code = 3
				end

				Tweet.create(
					user_id: user.id,
					tweet_created_at: tweet.created_at,
					text: tweet.text,
					value: value, 
					color_code: color_code
					)
			
			end

			redirect_to '/'
		else
			@password_error = true
			redirect_to '/account/new'
		end
	end


end