class Condition < ApplicationRecord
  belongs_to :provider
  belongs_to :patient
end
