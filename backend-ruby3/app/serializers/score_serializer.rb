class ScoreSerializer < ActiveModel::Serializer
  attributes :points, :time_in_seconds, :room, :phrase 
end
