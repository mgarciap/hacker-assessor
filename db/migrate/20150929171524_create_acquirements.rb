class CreateAcquirements < ActiveRecord::Migration
  def change
    create_table :acquirements do |t|
      t.integer :level
      t.belongs_to :hacker, index: true, foreign_key: true
      t.belongs_to :skill, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
