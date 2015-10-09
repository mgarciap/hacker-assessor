require 'assessor'

class WelcomeController < ApplicationController
  skip_before_action :require_authentication

  def index
    if current_hacker
      @assessor = Assessor.new current_hacker
      render :dashboard
    end
  end
end
