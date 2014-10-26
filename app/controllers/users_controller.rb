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

			# MY TWITTER CLIENT VARIABLE NIL :( AFTER CREATING CLIENT, STORING TWEETS THEN REDIRECTING TO SIGN-IN PAGE

			twitterAPI = $twitter.user_timeline(user.handle, :count => 20)

			twitterAPI.each do |tweet|
				
				value = 0
				# ADDING VALUE FOR CHAR # AND @
				tweet.text.split('').each do |char|
					if char == '#' || char == '@'
						value += 3
					end
				end

				# ADDING VALUE FOR LINKS
				if text.include?('http')
					value +=5
				end

				time = Time.new(text.created_at)

				#ADDING COLOR CODE
				if time.hour == 0 && time.hour < 8
					color_code = 0
				elsif time.hour == 8 && time.hour < 16
					color_code = 1
				else
					color_code = 3
				end

				# CREATING TWEET OBJECT
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
	
	end #END CREATE METHOD


end