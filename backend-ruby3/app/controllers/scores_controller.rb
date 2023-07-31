class ScoresController < ApplicationController

  def index
    scores = Score.all
    render json: scores
  end

  def show
    score = Score.find_by_id(params[:id])
    render json: score
  end

  def create
    room = Room.find_by_id(params[:room_id])
    score = room.scores.build(score_params)
    if score.save
      render json: score
    else
      render json: { errors: user.errors }, status: 422
    end
  end

  def highscores
    highscores = Score.get_high_scores
    render json: highscores
  end

  def destroy
    score = Score.find_by_id(params[:id])
    score.destroy
    render json: score
  end

  private

  def score_params
    params.require(:score).permit(:points, :time_in_seconds, :room_id, :phrase)
  end

  def room_params
    params.require(:room).permit(:name, :room_id)
  end
end
