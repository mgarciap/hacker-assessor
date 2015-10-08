class Career < ActiveRecord::Base
  has_many :hackers
  has_many :requirements

  def get_seniority acquirements
    missing_requirements(acquirements).map(&:seniority).min - 1
  end

  def missing_requirements acquirements
    @missing_requirements ||= requirements.reject do |requirement|
      acquirements.any? do |acquirement|
        requirement.skill_id == acquirement.skill_id && acquirement.level >= requirement.level
      end
    end
  end
end
