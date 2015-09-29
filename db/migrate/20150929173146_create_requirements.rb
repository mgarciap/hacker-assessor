class CreateRequirements < ActiveRecord::Migration
  def change
    create_table :requirements do |t|
      t.integer :level
      t.belongs_to :seniority, index: true, foreign_key: true
      t.belongs_to :skill, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
