class RoomSerializer < ActiveModel::Serializer
  attributes :id, :title, :status, :drawer_id, :selected_phrase_id, :timer
  has_many :chats
  has_many :canvas
  has_one :phrase
  has_many :users
  has_one :timer 
  ### React doesn't like it being a child object
end
