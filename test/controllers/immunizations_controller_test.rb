require 'test_helper'

class ImmunizationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @immunization = immunizations(:one)
  end

  test "should get index" do
    get immunizations_url, as: :json
    assert_response :success
  end

  test "should create immunization" do
    assert_difference('Immunization.count') do
      post immunizations_url, params: { immunization: { date: @immunization.date, dose: @immunization.dose, name: @immunization.name, patient_id: @immunization.patient_id, provider_id: @immunization.provider_id } }, as: :json
    end

    assert_response 201
  end

  test "should show immunization" do
    get immunization_url(@immunization), as: :json
    assert_response :success
  end

  test "should update immunization" do
    patch immunization_url(@immunization), params: { immunization: { date: @immunization.date, dose: @immunization.dose, name: @immunization.name, patient_id: @immunization.patient_id, provider_id: @immunization.provider_id } }, as: :json
    assert_response 200
  end

  test "should destroy immunization" do
    assert_difference('Immunization.count', -1) do
      delete immunization_url(@immunization), as: :json
    end

    assert_response 204
  end
end
