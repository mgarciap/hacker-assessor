class CreateSeniorities < ActiveRecord::Migration
  def change
    create_table :seniorities do |t|
      t.string :name

      t.timestamps null: false
    end
    add_index :seniorities, :name, unique: true
  end
end
