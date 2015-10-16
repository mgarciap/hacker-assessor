require 'test_helper'
require 'panorama'

class PanoramaTest < ActiveSupport::TestCase
  test 'build the table' do
    panorama = Panorama.new careers(:js)
    panorama.each_skill do |r|
      assert Skill.exists?(r[:skill_id])
      assert_equal r[:requirements_levels].size, Seniority::NAMES.size
    end
  end
end
