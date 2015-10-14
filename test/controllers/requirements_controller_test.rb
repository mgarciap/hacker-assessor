require 'test_helper'

class RequirementsControllerTest < ActionController::TestCase
  setup do
    @requirement = requirements(:senior_js_tdd)
  end

  test "should get new" do
    get :new, career_id: careers(:js)
    assert_response :success
  end

  test "should create requirement" do
    assert_difference('Requirement.count') do
      post :create, career_id: @requirement.career,
        requirement: { level: @requirement.level,
                       seniority: @requirement.seniority,
                       skill_id: @requirement.skill_id }
    end

    assert_redirected_to career_path(assigns(:career))
  end

  test "should get edit" do
    get :edit, id: @requirement, career_id: @requirement.career
    assert_response :success
  end

  test "should update requirement" do
    patch :update, id: @requirement, career_id: @requirement.career,
      requirement: { level: @requirement.level,
                     seniority: @requirement.seniority,
                     skill_id: @requirement.skill_id }
    assert_redirected_to career_path(assigns(:career))
  end

  test "should destroy requirement" do
    assert_difference('Requirement.count', -1) do
      delete :destroy, id: @requirement, career_id: @requirement.career
    end

    assert_redirected_to career_path(assigns(:career))
  end
end
