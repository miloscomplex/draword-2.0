class TimersController < ApplicationController

  def show
    # display by room_id
    timer = Timer.find_by(id: params[:id])
    render json: timer
  end

  def create
    timer = Timer.find_or_create_by(id: params[:id])
    timer.update(user_params)
    if timer.save
      render json: timer
    else
      render json: { error: 'Could not update the timer'}, status: 422
    end
  end

  def update
    timer = Timer.find_or_create_by(id: params[:id])
    timer.update(user_params)
    if timer.save
      render json: timer
    else
      render json: { error: 'Could not update the timer'}, status: 422
    end
  end

  private

    def user_params
      params.require(:timer).permit(:id, :time, :is_on, :start, :room_id)
    end

end
