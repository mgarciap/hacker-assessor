class Seniority < Ohm::Model
  attribute :name
  index :name
  collection :hackers, :Hacker
  collection :requirements, :Requirement
end
