require 'test_helper'

class SessionsControllerTest < ActionController::TestCase
  setup do
    session[:hacker_id] = nil
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should try to login and fail" do
    post :create, { email: 'rodri@altoros.com', password: 'fail' }
    assert_not session[:hacker_id]
    assert_equal 'Invalid email or password', flash.alert
  end

  test "should try to login and success" do
    post :create, { email: 'rodri@altoros.com', password: 'rodrigo' }
    assert_equal session[:hacker_id], Hacker.first.id
    assert_equal 'Successfully logged in', flash.notice
  end

  test "should logout from the session" do
    delete :destroy
    assert_not session[:hacker_id]
    assert_equal 'Logged out', flash.notice
  end
end
