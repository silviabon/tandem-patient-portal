class VitalsController < ApplicationController
  before_action :set_vital, only: [:show, :update, :destroy]

  # GET /vitals
  def index
    @patient = Patient.find(params[:patient_id])
    @vitals = @patient.vitals.all

    render json: @vitals
  end

  # GET /vitals/1
  def show
    render json: @vital
  end

  # POST /vitals
  def create
    @vital = Vital.new(vital_params)

    if @vital.save
      render json: @vital, status: :created, location: @vital
    else
      render json: @vital.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /vitals/1
  def update
    if @vital.update(vital_params)
      render json: @vital
    else
      render json: @vital.errors, status: :unprocessable_entity
    end
  end

  # DELETE /vitals/1
  def destroy
    @vital.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vital
      @vital = Vital.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def vital_params
      params.require(:vital).permit(:provider_id, :patient_id, :bp_s, :bp_d, :weight_kg, :height_cm, :temperature_c, :pulse, :bmi)
    end
end
