class CreateAppointments < ActiveRecord::Migration[5.0]
  def change
    create_table :appointments do |t|
      t.references :provider, foreign_key: true
      t.references :patient, foreign_key: true
      t.references :condition, foreign_key: true
      t.date :date
      t.text :patient_summary
      t.string :concern
      t.string :status

      t.timestamps
    end
  end
end
