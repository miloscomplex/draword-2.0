class CanvasController < ApplicationController

  def index
    canvas = Canva.all
    render json: canvas
  end

  def show
    room = Room.find_by(id: params[:id])
    render json: room.canvas
  end

  def create
    # just broadcast don't write to the server
    serialized_data = canva_params
    ActionCable.server.broadcast "canvas_channel_#{canva_params[:room_id]}", serialized_data
      # stream_for and broadcast_to to be useful for transmitting data along non-universal channels, such as for members of a particular conversation or specific users
      head :ok
  end

  def receive(data)
    ActionCable.server.broadcast "canvas_channel_#{canva_params[:room_id]}", "hee hawww"
  end

  private

  def canva_params
    params.require(:canva).permit(:action, :offsetX, :offsetY, :room_id, :color)
  end

end
