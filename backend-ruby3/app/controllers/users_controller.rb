class UsersController < ApplicationController

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find_by_id(params[:id])
    render json: user
  end

  def create
    # consider doing user_session if live.
    user = User.find_or_create_by(id: params[:user_id]) do |user|
      user.name = Faker::Music.band
    end
    if user.valid?
      user.update(user_params)
      render json: user
    else
      render json: { error: 'Could not find/create the user'}, status: 422
    end
  end

  def update
    user = User.find_or_create_by(id: params[:user_id]) do |user|
      user.name = Faker::Music.band
    end
    user.update(user_params)
    if user.save
      render json: user
    else
      render json: { error: 'Could not update the user'}, status: 422
    end
  end

  def destroy
    user = User.find_by_id(params[:user_id])
    user.destroy
    render json: user
  end

private

  def score_params
    params.require(:score).permit(:user_id, :points, :time_in_seconds, :guesses)
  end

  def user_params
    params.require(:user).permit(:id, :user_id, :initials, :room_id)
  end



end
