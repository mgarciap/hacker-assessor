class RequirementsController < ApplicationController
  before_action :set_requirement, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @requirements = Requirement.all
    respond_with(@requirements)
  end

  def show
    respond_with(@requirement)
  end

  def new
    @requirement = Requirement.new
    respond_with(@requirement)
  end

  def edit
  end

  def create
    @requirement = Requirement.new(requirement_params)
    @requirement.save
    respond_with(@requirement)
  end

  def update
    @requirement.update(requirement_params)
    respond_with(@requirement)
  end

  def destroy
    @requirement.destroy
    respond_with(@requirement)
  end

  private
    def set_requirement
      @requirement = Requirement.find(params[:id])
    end

    def requirement_params
      params.require(:requirement).permit(:level, :seniority_id, :skill_id)
    end
end
