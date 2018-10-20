require 'test_helper'

class SoapsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @soap = soaps(:one)
  end

  test "should get index" do
    get soaps_url, as: :json
    assert_response :success
  end

  test "should create soap" do
    assert_difference('Soap.count') do
      post soaps_url, params: { soap: { appointment_id: @soap.appointment_id, doctor_summary: @soap.doctor_summary, provider_id: @soap.provider_id } }, as: :json
    end

    assert_response 201
  end

  test "should show soap" do
    get soap_url(@soap), as: :json
    assert_response :success
  end

  test "should update soap" do
    patch soap_url(@soap), params: { soap: { appointment_id: @soap.appointment_id, doctor_summary: @soap.doctor_summary, provider_id: @soap.provider_id } }, as: :json
    assert_response 200
  end

  test "should destroy soap" do
    assert_difference('Soap.count', -1) do
      delete soap_url(@soap), as: :json
    end

    assert_response 204
  end
end
