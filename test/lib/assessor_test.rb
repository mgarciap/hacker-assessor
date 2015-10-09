require 'test_helper'
require 'assessor'

class AssessorTest < ActiveSupport::TestCase
  setup do
    @assessor = Assessor.new hackers(:jorge)
  end

  test "can get the current seniority for the hacker" do
    assert_equal 2, @assessor.current_seniority
  end
end
