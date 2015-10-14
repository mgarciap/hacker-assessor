class CareersController < ApplicationController
  before_action :set_career, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @careers = Career.all
    respond_with(@careers)
  end

  def show
    respond_with(@career)
  end

  def new
    @career = Career.new
    respond_with(@career)
  end

  def edit
  end

  def create
    @career = Career.new(career_params)
    @career.save
    respond_with(@career)
  end

  def update
    @career.update(career_params)
    respond_with(@career)
  end

  def destroy
    @career.destroy
    respond_with(@career)
  end

  private
    def set_career
      @career = Career.find(params[:id])
    end

    def career_params
      params.require(:career).permit(:name, :description)
    end
end
