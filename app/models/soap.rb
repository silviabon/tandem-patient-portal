class Soap < ApplicationRecord
  belongs_to :provider
  belongs_to :appointment
end
