require 'test_helper'

class SessionsControllerTest < ActionController::TestCase
  setup do
    session.clear
  end

  test "fail login with invalid credentials" do
    post :create, { email: hackers(:jorge).email, password: 'fail' }
    assert_not session[:hacker_id]
    assert_equal 'Invalid email or password', flash.alert
  end

  test "success login with valid credentials" do
    post :create, { email: hackers(:jorge).email, password: 'jorge' }
    assert_equal session[:hacker_id], hackers(:jorge).id
    assert_equal 'Successfully logged in', flash.notice
  end

  test "logout from the session" do
    delete :destroy
    assert_not session[:hacker_id]
    assert_equal 'Logged out', flash.notice
  end
end
