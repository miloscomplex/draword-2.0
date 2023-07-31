class RoomsController < ApplicationController

  def index
    rooms = Room.all
    render json: rooms, root: false
  end

  def show
    # display by room_id
    room = Room.find_by(id: params[:id])
    render json: room
  end


  def create
    room = Room.create(room_params)
    if room.valid?
    # broadcast to anyone subscribed to the FeedChannel for this specific id
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        RoomSerializer.new(room)
      ).serializable_hash
      ActionCable.server.broadcast 'rooms_channel', serialized_data
      head :ok
    else
      render json: { error: 'Could not create the room'}, status: 422
    end
  end

  def update
    room = Room.find_by_id(params[:room_id])
    room.update(room_params)
    if room.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        RoomSerializer.new(room)
      ).serializable_hash
      ActionCable.server.broadcast "room_channel_#{params[:room_id]}",
      serialized_data
      render json: room
    else
      render json: { error: 'Could not update the room'}, status: 422
    end
  end

  def timer
    time = { current_time: params[:time] }
    ActionCable.server.broadcast "room_channel_#{params[:room_id]}", time
  end

  private

  def room_params
    params.require(:room).permit(:title, :room_id, :drawer_id, :selected_phrase_id, :status)
  end

end
