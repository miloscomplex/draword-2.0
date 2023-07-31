class Timer < ApplicationRecord
  belongs_to :room, optional: true
end
