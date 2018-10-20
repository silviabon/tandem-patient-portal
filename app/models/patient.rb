class Patient < ApplicationRecord
  belongs_to :provider
  has_many :vitals
  has_many :immunizations
  has_many :prescriptions
  has_many :conditions
  has_many :appointments
end
