class Skill < Ohm::Model
  attribute :name
  attribute :description
  index :name
end
