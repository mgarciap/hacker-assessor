require 'test_helper'

class AcquirementTest < ActiveSupport::TestCase
  test 'use experience levels' do
    assert_equal 'tried', acquirements(:jorge_tdd).level.to_s
  end
end
