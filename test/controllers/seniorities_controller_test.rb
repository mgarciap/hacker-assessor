require 'test_helper'

class SenioritiesControllerTest < ActionController::TestCase
  setup do
    @seniority = seniorities(:senior_frontend)
  end

  test "requires being logged in" do
    session.clear
    get :index
    assert_redirected_to root_url
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:seniorities)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create seniority" do
    assert_difference('Seniority.count') do
      post :create, seniority: { name: 'Time Traveler' }
    end

    assert_redirected_to seniority_path(assigns(:seniority))
  end

  test "should show seniority" do
    get :show, id: @seniority
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @seniority
    assert_response :success
  end

  test "should update seniority" do
    patch :update, id: @seniority, seniority: { name: @seniority.name }
    assert_redirected_to seniority_path(assigns(:seniority))
  end

  test "should destroy seniority" do
    assert_difference('Seniority.count', -1) do
      delete :destroy, id: @seniority
    end

    assert_redirected_to seniorities_path
  end
end
