class Skill < Ohm::Model
  attribute :name
  attribute :description
  index :name

  def to_hash
    super.merge attributes
  end
end
