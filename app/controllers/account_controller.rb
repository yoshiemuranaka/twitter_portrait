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

	def create

		if params[:password] == params[:password_confirm]

			if params[:handle].include?('@')
				params[:handle].slice!(0)
			end

			user = User.new(
				fname: params[:fname],
				lname: params[:lname],
				handle: params[:handle].downcase,
				email: params[:email],
				password: params[:password]
				)

			if user.valid?
				user.save
				#IF USER IS VALID, WILL AJAX TWITTER API AND STORE USER'S TWEETS
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
					
					# CREATING TWEET OBJECT
					time = tweet.created_at

					Tweet.create(
						user_id: user.id,
						tweet_created_at: time.strftime("%Y-%m-%d %H:%M:%S"),
						text: tweet.text,
						value: value, 
						color_code: time.hour
						)
				end #PARSING THROUGH USER TWEETS TO ADD TO DATABASE

					redirect_to '/' #REDIRECTING TO SIGN IN PAGE AFTER SUCCESSFUL ACCOUNT CREATION
				
			else

					if user.errors.messages == {:email=>["has already been taken"]}
						@email_taken_error = true
						render :new
					elsif user.errors.messages == {:handle=>["has already been taken"]}
						@handle_taken_error = true
						render :new
					elsif user.errors.messages == {:password=>["is too short (minimum is 6 characters)"]}
						@password_length_error = true
						render :new
					else 
						@missing_fields_error = true
						render :new
					end
			end

		else
		
			@password_error = true
			render :new
	
		end #END IF PASSWORDS MATCH

	end #END CREATE METHOD

end