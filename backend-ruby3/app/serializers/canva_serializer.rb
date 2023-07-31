class CanvaSerializer < ActiveModel::Serializer
  attributes :id, :room_id, :action, :offsetX, :offsetY
end
