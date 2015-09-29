class Requirement < ActiveRecord::Base
  belongs_to :seniority
  belongs_to :skill
end
