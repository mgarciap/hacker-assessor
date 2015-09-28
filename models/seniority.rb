class Seniority < Ohm::Model
  attribute :name
  index :name
  collection :hackers, :Hacker
  collection :requirements, :Requirement

  def skills
    Skill.fetch(requirements.map { |a| a.skill_id })
  end
end
