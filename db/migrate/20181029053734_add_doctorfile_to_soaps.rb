class AddDoctorfileToSoaps < ActiveRecord::Migration[5.0]
  def change
    add_column :soaps, :doctorfile, :string
  end
end
