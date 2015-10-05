class Seniority < ActiveRecord::Base
  has_many :requirements
  has_many :skills, through: :requirements

  accepts_nested_attributes_for :requirements, allow_destroy: true
  validates :name, presence: true
end
