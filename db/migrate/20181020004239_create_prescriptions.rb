class CreatePrescriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :prescriptions do |t|
      t.references :provider, foreign_key: true
      t.references :patient, foreign_key: true
      t.string :name
      t.string :dose
      t.string :quantity
      t.integer :refill
      t.string :route
      t.date :date

      t.timestamps
    end
  end
end
