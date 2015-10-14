require 'test_helper'
require 'experience_level'

class ExperienceLevelTest < ActiveSupport::TestCase

  test 'works as a number' do
    assert_equal 2, ExperienceLevel.new(2)
  end

  test 'shows as the name' do
    assert_equal 'read', ExperienceLevel.new(1).to_s
  end

end
