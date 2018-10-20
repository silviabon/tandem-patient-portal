class CreatePatients < ActiveRecord::Migration[5.0]
  def change
    create_table :patients do |t|
      t.references :provider, foreign_key: true
      t.string :first_name
      t.string :last_name
      t.date :dob
      t.integer :personal_health_number
      t.bigint :telephone
      t.string :email
      t.string :password
      t.string :sex

      t.timestamps
    end
  end
end
