require 'test_helper'

class HackerTest < ActiveSupport::TestCase
  test "have a seniority" do
    assert_equal 2, hackers(:jorge).seniority
  end
end
