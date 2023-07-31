class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "room_channel_#{params[:room_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    @user = User.find_by_id(params[:user_id])
    @room = Room.find_by_id(params[:room_id])

    if @user.id == @room.drawer_id
      room = Room.find_by_id(params[:room_id])
      room.drawer_id = nil
      room.status = 'drawerLeft'
      room.selected_phrase_id = nil
      if room.save
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          RoomSerializer.new(room)
        ).serializable_hash
        ActionCable.server.broadcast "room_channel_#{params[:room_id]}",
        serialized_data
      end
    end
  end

  def room_params
    params.require(:room).permit(:title, :room_id, :status, :drawer_id, :selected_phrase_id, :status)
  end

end
