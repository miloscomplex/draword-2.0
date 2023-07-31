class User < ApplicationRecord
  belongs_to :room, optional: true

  validates :name, presence: true
  # validates :name, :initials, presence: true
  # validates :initials, length: { minimum: 2, maximum: 4}

end
