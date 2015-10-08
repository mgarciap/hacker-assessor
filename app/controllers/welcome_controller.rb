class WelcomeController < ApplicationController
  skip_before_action :require_authentication

  def index
    render :dashboard if current_hacker
  end
end
