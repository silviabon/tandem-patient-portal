class AddDetailstoAppointments < ActiveRecord::Migration[5.0]
  def change
    add_column :appointments, :app_type, :string
    add_column :appointments, :concern_desc, :text
    add_column :appointments, :symptoms, :text
    add_column :appointments, :other_symptoms, :string
    add_column :appointments, :temp, :string
    add_column :appointments, :heart_rate, :string
    add_column :appointments, :bp, :string
    add_column :appointments, :q1, :string
    add_column :appointments, :q2, :string
  end
end
