class Hacker < Ohm::Model
  attribute :name
  index :name
  reference :seniority, :Seniority
  collection :acquirements, :Acquirement
end
