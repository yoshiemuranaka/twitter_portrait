class User < ActiveRecord::Base
	has_secure_password
	has_many :tweets
	validates :fname, :lname, :email, :handle, presence: true
	validates :email, uniqueness: true
end