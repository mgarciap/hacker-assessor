class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :require_authentication

  private

    def require_authentication
      redirect_to root_url, alert: 'Login required' unless session[:hacker_id]
    end
end
