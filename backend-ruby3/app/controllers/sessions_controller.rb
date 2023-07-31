class SessionsController < ApplicationController

  def index
    sessions = Session.all
    render json: sessions
  end

  def create
    @user = SecureRandom.hex
    session[:current_user_id] = @user
  end

  def end_session
    end_session!
  end

  # Returns the current logged-in user (if any).
  def current_user
    @user ||= User.find_by(id: session[:user_id])
  end

  # Returns true if the user is logged in, false otherwise.
  def logged_in?
    !!current_user
  end

  # Logs out the current user.
  def logout!
    session.clear
  end

  def clear_user_type
      session[:user_type].clear
  end

  def which_user?
    session[:user_type]
  end

end
