class ChatSerializer < ActiveModel::Serializer
  attributes :id, :room_id, :text, :created_at, :role, :name
end
