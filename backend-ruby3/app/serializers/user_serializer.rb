class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :room_id
  has_one :room
end
