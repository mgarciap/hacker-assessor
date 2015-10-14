require 'test_helper'

class RequirementTest < ActiveSupport::TestCase
  test 'use experience levels' do
    assert_equal 'played', requirements(:senior_js_tdd).level.to_s
  end
end
