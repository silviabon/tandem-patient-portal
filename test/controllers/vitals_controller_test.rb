require 'test_helper'

class VitalsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @vital = vitals(:one)
  end

  test "should get index" do
    get vitals_url, as: :json
    assert_response :success
  end

  test "should create vital" do
    assert_difference('Vital.count') do
      post vitals_url, params: { vital: { bmi: @vital.bmi, bp_d: @vital.bp_d, bp_s: @vital.bp_s, height_cm: @vital.height_cm, patient_id: @vital.patient_id, provider_id: @vital.provider_id, pulse: @vital.pulse, temperature_c: @vital.temperature_c, weight_kg: @vital.weight_kg } }, as: :json
    end

    assert_response 201
  end

  test "should show vital" do
    get vital_url(@vital), as: :json
    assert_response :success
  end

  test "should update vital" do
    patch vital_url(@vital), params: { vital: { bmi: @vital.bmi, bp_d: @vital.bp_d, bp_s: @vital.bp_s, height_cm: @vital.height_cm, patient_id: @vital.patient_id, provider_id: @vital.provider_id, pulse: @vital.pulse, temperature_c: @vital.temperature_c, weight_kg: @vital.weight_kg } }, as: :json
    assert_response 200
  end

  test "should destroy vital" do
    assert_difference('Vital.count', -1) do
      delete vital_url(@vital), as: :json
    end

    assert_response 204
  end
end
