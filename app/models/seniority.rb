class Seniority < ActiveRecord::Base
  has_many :requirements
  has_many :skills, through: :requirements
end
