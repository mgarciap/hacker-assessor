class Requirement < ActiveRecord::Base
  belongs_to :seniority
  belongs_to :skill

  validates :level, presence: true
  validates :skill_id, presence: true
end
