class AddFileToAppointments < ActiveRecord::Migration[5.0]
  def change
    add_column :appointments, :file, :string
  end
end
