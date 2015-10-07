class AcquirementsController < ApplicationController
  before_action :set_acquirement, only: [:edit, :update, :destroy]

  respond_to :html

  def index
    @acquirements = acquirements
  end

  def new
    @acquirement = acquirements.new
  end

  def edit
  end

  def create
    @acquirement = acquirements.create acquirement_params
    respond_with(@acquirement, location: new_acquirement_path)
  end

  def update
    @acquirement.update(acquirement_params)
    respond_with(@acquirement, location: acquirements_path)
  end

  def destroy
    @acquirement.destroy
    respond_with(@acquirement)
  end

  private
    def acquirements
      current_hacker.acquirements
    end

    def set_acquirement
      @acquirement = acquirements.find(params[:id])
    end

    def acquirement_params
      params.require(:acquirement).permit(:level, :hacker_id, :skill_id)
    end
end
