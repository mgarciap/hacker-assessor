class Requirement < Ohm::Model
  attribute :level
  reference :seniority, :Seniority
  reference :skill, :Skill
end
