require 'test_helper'

class HackerFlowsTest < ActionDispatch::IntegrationTest

  test "login" do
    login :jorge
  end

  def login hacker
    get root_path
    post_via_redirect login_path,
      email: hackers(hacker).email,
      password: hackers(hacker).name
    assert_response :success
    assert_equal "Successfully logged in", flash[:notice]
  end

end
