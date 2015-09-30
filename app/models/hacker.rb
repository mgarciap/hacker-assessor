class Hacker < ActiveRecord::Base
  has_secure_password
  has_many :acquirements
  has_many :skills, through: :acquirements
end
