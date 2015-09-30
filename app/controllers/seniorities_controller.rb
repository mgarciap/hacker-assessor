class SenioritiesController < ApplicationController
  before_action :set_seniority, only: [:show, :edit, :update, :destroy]

  # GET /seniorities
  # GET /seniorities.json
  def index
    @seniorities = Seniority.all
  end

  # GET /seniorities/1
  # GET /seniorities/1.json
  def show
  end

  # GET /seniorities/new
  def new
    @seniority = Seniority.new
    @seniority.requirements.build
  end

  # GET /seniorities/1/edit
  def edit
  end

  # POST /seniorities
  # POST /seniorities.json
  def create
    @seniority = Seniority.new(seniority_params)

    respond_to do |format|
      if @seniority.save
        format.html { redirect_to @seniority, notice: 'Seniority was successfully created.' }
        format.json { render :show, status: :created, location: @seniority }
      else
        format.html { render :new }
        format.json { render json: @seniority.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /seniorities/1
  # PATCH/PUT /seniorities/1.json
  def update
    respond_to do |format|
      if @seniority.update(seniority_params)
        format.html { redirect_to @seniority, notice: 'Seniority was successfully updated.' }
        format.json { render :show, status: :ok, location: @seniority }
      else
        format.html { render :edit }
        format.json { render json: @seniority.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /seniorities/1
  # DELETE /seniorities/1.json
  def destroy
    @seniority.destroy
    respond_to do |format|
      format.html { redirect_to seniorities_url, notice: 'Seniority was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_seniority
      @seniority = Seniority.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def seniority_params
      params.require(:seniority).permit(:name, { requirements_attributes: [:skill_id, :level] } )
    end
end
