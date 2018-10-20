class CreateSoaps < ActiveRecord::Migration[5.0]
  def change
    create_table :soaps do |t|
      t.references :provider, foreign_key: true
      t.references :appointment, foreign_key: true
      t.text :doctor_summary

      t.timestamps
    end
  end
end
