class Appointment < ApplicationRecord
  belongs_to :provider
  belongs_to :patient
  belongs_to :condition
end
