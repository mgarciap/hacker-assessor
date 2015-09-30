class SessionsController < ApplicationController
  def new
  end

  def create
    hacker = Hacker.find_by(email: params[:email])
      .try(:authenticate, params[:password])
    if hacker
      session[:hacker_id] = hacker.id
      redirect_to root_url, notice: 'Successfully logged in'
    else
      flash.now.alert = 'Invalid email or password'
      render 'new'
    end
  end

  def destroy
    session[:hacker_id] = nil
    redirect_to root_url, notice: 'Logged out'
  end
end
