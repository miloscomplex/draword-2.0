class RoomsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'rooms_channel'
    # You can also add methods here instead of a controller
    # or delegate to Active Jobs
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # stop_stream_from 'rooms_channel'
  end
end
