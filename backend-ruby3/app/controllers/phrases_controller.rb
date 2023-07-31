class PhrasesController < ApplicationController

  def index
    phrases = Phrase.all
    render json: phrases
  end

  def show
    phrase = Phrase.find_by(id: params[:id])
    render json: phrase
  end

  def show_random
    random = Phrase.limit(3).order("RANDOM()")
    render json: random
  end
end
