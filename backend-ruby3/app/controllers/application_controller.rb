class ApplicationController < ActionController::API

  def current_user
    current_user = session[:current_user] || []
  end

  def user_exits?
    !!session[:current_user]
  end

end
