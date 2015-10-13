require 'experience_level'

class Acquirement < ActiveRecord::Base
  belongs_to :hacker
  belongs_to :skill

  validates :level, presence: true
  validates :skill_id, presence: true, uniqueness: { scope: :hacker_id }

  def level
    ExperienceLevel.new(super)
  end
end
