class CreateVitals < ActiveRecord::Migration[5.0]
  def change
    create_table :vitals do |t|
      t.references :provider, foreign_key: true
      t.references :patient, foreign_key: true
      t.integer :bp_s
      t.integer :bp_d
      t.float :weight_kg
      t.float :height_cm
      t.float :temperature_c
      t.integer :pulse
      t.float :bmi
      t.date :date

      t.timestamps
    end
  end
end
