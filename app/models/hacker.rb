class Hacker < ActiveRecord::Base
  has_secure_password
  has_many :acquirements
  has_many :skills, through: :acquirements
  belongs_to :career

  validates :career_id, presence: true

  def seniority
    career.get_seniority acquirements
  end

  def missing_requirements_for_next_level
    career.missing_requirements(acquirements).keep_if do |r|
      r.seniority == seniority.next
    end
  end
end
