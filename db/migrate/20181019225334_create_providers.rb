class CreateProviders < ActiveRecord::Migration[5.0]
  def change
    create_table :providers do |t|
      t.string :first_name
      t.string :last_name
      t.integer :billing_number

      t.timestamps
    end
  end
end
