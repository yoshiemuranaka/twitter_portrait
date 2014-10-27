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

			# AFTER CREATING CLIENT, TRYING TO STORE NEW CLIENT TWEETS THEN REDIRECTING TO SIGN-IN PAGE

			twitterAPI = $twitter.user_timeline(user.handle, :count => 200)

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

				#ADDING COLOR CODE -- NEEDS WORK
				time = tweet.created_at
				# if time.hour == 0 && time.hour < 8
				# 	color_code = 0
				# elsif time.hour == 8 && time.hour < 16
				# 	color_code = 1
				# else
				# 	color_code = 2
				# end

				# CREATING TWEET OBJECT

				Tweet.create(
					user_id: user.id,
					tweet_created_at: tweet.created_at,
					text: tweet.text,
					value: value, 
					color_code: time.hour
					)
			
			end

			redirect_to '/'
		
		else
			
			@password_error = true
			redirect_to '/account/new'
		
		end
	
	end #END CREATE METHOD


end