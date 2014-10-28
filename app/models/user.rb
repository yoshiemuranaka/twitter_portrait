class User < ActiveRecord::Base
	has_secure_password
	has_many :tweets
	validates :fname, :lname, :email, :handle, presence: true
	validates :email, uniqueness: true
	validates :handle, uniqueness: true
	validates :password, length: { in: 6..25 }
end