class GamePlaysChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @user = User.find_by_id(params[:user_id])
    stream_from "game_plays_channel_#{params[:room_id]}"
    @room = Room.find_by_id(params[:room_id])
  end

  def unsubscribed
    # handle db cleanup here
    @user = User.find_by_id(params[:user_id])
    @room = Room.find_by_id(params[:room_id])

    if @user.id == @room.drawer_id
      
    end
    if @user
      # null out room_id here to avoid any async issues
      @user.room_id = nil
      @user.save
    end
    # Any cleanup needed when channel is unsubscribed
  end
end
