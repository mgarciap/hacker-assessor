class SenioritiesController < ApplicationController
  before_action :set_seniority, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @seniorities = Seniority.all
    respond_with(@seniorities)
  end

  def show
    respond_with(@seniority)
  end

  def new
    @seniority = Seniority.new
    @seniority.requirements.build
    respond_with(@seniority)
  end

  def edit
  end

  def create
    @seniority = Seniority.new(seniority_params)
    @seniority.save
    respond_with(@seniority)
  end

  def update
    @seniority.update(seniority_params)
    respond_with(@seniority)
  end

  def destroy
    @seniority.destroy
    respond_with(@seniority)
  end

  private
    def set_seniority
      @seniority = Seniority.find(params[:id])
    end

    def seniority_params
      params.require(:seniority).permit(:name, { requirements_attributes: [:skill_id, :level] })
    end
end
