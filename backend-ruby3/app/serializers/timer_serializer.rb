class TimerSerializer < ActiveModel::Serializer
  attributes :id, :time, :is_on, :start
end
