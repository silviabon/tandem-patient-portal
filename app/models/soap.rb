class Soap < ApplicationRecord
  belongs_to :provider
  belongs_to :appointment
  mount_uploader :doctorfile, DoctorFileUploader
end
