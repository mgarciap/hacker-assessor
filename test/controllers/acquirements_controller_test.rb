require 'test_helper'

class AcquirementsControllerTest < ActionController::TestCase
  setup do
    @acquirement = acquirements(:jorge_tdd)
  end

  test "index the current hacker acquirements" do
    get :index
    assert_response :success
    assert_not_nil assigns(:acquirements)
    assert_includes assigns(:acquirements), acquirements(:jorge_tdd)
    refute_includes assigns(:acquirements), acquirements(:rodri_js),
      'Rodri acquirements are not listed'
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create acquirement" do
    assert_difference('Acquirement.count') do
      post :create, acquirement: { hacker_id: @acquirement.hacker_id, level: @acquirement.level, skill_id: @acquirement.skill_id }
    end

    assert_redirected_to acquirement_path(assigns(:acquirement))
  end

  test "should show acquirement" do
    get :show, id: @acquirement
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @acquirement
    assert_response :success
  end

  test "should update acquirement" do
    patch :update, id: @acquirement, acquirement: { hacker_id: @acquirement.hacker_id, level: @acquirement.level, skill_id: @acquirement.skill_id }
    assert_redirected_to acquirement_path(assigns(:acquirement))
  end

  test "should destroy acquirement" do
    assert_difference('Acquirement.count', -1) do
      delete :destroy, id: @acquirement
    end

    assert_redirected_to acquirements_path
  end
end
