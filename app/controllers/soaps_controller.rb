class SoapsController < ApplicationController
  before_action :set_soap, only: [:show, :update, :destroy]

  # GET /soaps
  def index
    @soaps = Soap.all

    render json: @soaps
  end

  # GET /soaps/1
  def show
    render json: @soap
  end

  # POST /soaps
  def create
    @soap = Soap.new(soap_params)

    if @soap.save
      render json: @soap, status: :created, location: @soap
    else
      render json: @soap.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /soaps/1
  def update
    if @soap.update(soap_params)
      render json: @soap
    else
      render json: @soap.errors, status: :unprocessable_entity
    end
  end

  # DELETE /soaps/1
  def destroy
    @soap.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_soap
      @soap = Soap.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def soap_params
      params.require(:soap).permit(:provider_id, :appointment_id, :doctor_summary)
    end
end
