class CreateConditions < ActiveRecord::Migration[5.0]
  def change
    create_table :conditions do |t|
      t.references :provider, foreign_key: true
      t.references :patient, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
