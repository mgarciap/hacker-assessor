require 'test_helper'

class HackerTest < ActiveSupport::TestCase
  test "have a seniority" do
    assert_equal 2, hackers(:jorge).seniority
  end

  test "knows the missing requirements to next level" do
    missing = hackers(:jorge).missing_requirements_for_next_level
    assert_includes missing, requirements(:senior_js_tdd)
  end
end
