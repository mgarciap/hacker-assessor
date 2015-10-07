class UseCareersInsteadOfSeniorities < ActiveRecord::Migration
  def change
    create_table :careers do |t|
      t.string :name
      t.text :description

      t.timestamps null: false
    end
    add_index :careers, :name, unique: true
    add_reference :hackers, :career, index: true, foreign_key: true

    remove_index :seniorities, :name
    drop_table :seniorities

    change_table :requirements do |t|
      t.remove_index :seniority_id
      t.remove :seniority_id
      t.integer :seniority, default: 0, null: false
    end
    add_reference :requirements, :career, index: true, foreign_key: true
    add_index :requirements, :seniority
  end
end
