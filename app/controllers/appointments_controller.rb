class AppointmentsController < ApplicationController
  before_action :set_appointment, only: [:show, :update, :destroy]

  # GET /appointments
  def index
    if params[:patient_id] != nil
      @patient = Patient.find(params[:patient_id])
      @appointments = @patient.appointments.all
    end

    if params[:provider_id] != nil
      @provider = Provider.find(params[:provider_id])
      @appointments = @provider.appointments.all
    end

    render json: @appointments
  end

  # GET /appointments/1
  def show
    render json: @appointment
  end

  # POST /appointments
  def create
    @patient = Patient.find(params[:patient_id])
    @appointment = @patient.appointments.new(appointment_params)

    if @appointment.save
      render json: @appointment, status: :created
      # location: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /appointments/1
  def update
    if @appointment.update(appointment_params)
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /appointments/1
  def destroy
    @appointment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_appointment
      @appointment = Appointment.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def appointment_params
      params.permit(:provider_id, :patient_id, :condition_id, :date, :patient_summary, :concern, :status, :time, :file, :app_type, :concern_desc, :symptoms, :other_symptoms, :temp, :heart_rate, :bp, :q1, :q2)
    end
end
