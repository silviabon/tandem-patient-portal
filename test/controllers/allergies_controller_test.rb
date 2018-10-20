require 'test_helper'

class AllergiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @allergy = allergies(:one)
  end

  test "should get index" do
    get allergies_url, as: :json
    assert_response :success
  end

  test "should create allergy" do
    assert_difference('Allergy.count') do
      post allergies_url, params: { allergy: { name: @allergy.name, patient_id: @allergy.patient_id, provider_id: @allergy.provider_id, severity: @allergy.severity } }, as: :json
    end

    assert_response 201
  end

  test "should show allergy" do
    get allergy_url(@allergy), as: :json
    assert_response :success
  end

  test "should update allergy" do
    patch allergy_url(@allergy), params: { allergy: { name: @allergy.name, patient_id: @allergy.patient_id, provider_id: @allergy.provider_id, severity: @allergy.severity } }, as: :json
    assert_response 200
  end

  test "should destroy allergy" do
    assert_difference('Allergy.count', -1) do
      delete allergy_url(@allergy), as: :json
    end

    assert_response 204
  end
end
