class Acquirement < Ohm::Model
  attribute :level
  reference :hacker, :Hacker
  reference :skill, :Skill
end
