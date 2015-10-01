class SessionsController < ApplicationController

  skip_before_action :require_authentication

  def new
  end

  def create
    hacker = Hacker.find_by(email: params[:email])
      .try(:authenticate, params[:password])
    if hacker
      session[:hacker_id] = hacker.id
      flash.notice = 'Successfully logged in'
    else
      flash.alert = 'Invalid email or password'
    end
    redirect_to root_url
  end

  def destroy
    session.clear
    redirect_to root_url, notice: 'Logged out'
  end
end
