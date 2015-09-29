class CreateHackers < ActiveRecord::Migration
  def change
    create_table :hackers do |t|
      t.string :name
      t.string :email
      t.string :password_digest

      t.timestamps null: false
    end
    add_index :hackers, :email, unique: true
  end
end
