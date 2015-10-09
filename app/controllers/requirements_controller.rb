class RequirementsController < ApplicationController
  before_action :set_requirement, only: [:edit, :update, :destroy]
  before_action :set_career

  respond_to :html

  def new
    @requirement = new_requirement
    respond_with(@requirement)
  end

  def edit
  end

  def create
    @requirement = new_requirement requirement_params
    @requirement.save
    respond_with(@requirement, location: career_path(@career))
  end

  def update
    @requirement.update(requirement_params)
    respond_with(@requirement, location: career_path(@career))
  end

  def destroy
    @requirement.destroy
    respond_with(@requirement, location: career_path(@career))
  end

  private

    def set_career
      @career = Career.find(params[:career_id])
    end

    def new_requirement attributes={}
      @requirement = Career.find(params[:career_id]).requirements.new attributes
    end

    def set_requirement
      @requirement = Requirement.find(params[:id])
    end

    def requirement_params
      params.require(:requirement).permit(:level, :seniority, :skill_id)
    end
end
