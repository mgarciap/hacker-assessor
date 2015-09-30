require 'test_helper'

class SkillLevelTest < ActiveSupport::TestCase
  test "works with collection for select with id and name" do
    assert SkillLevel.all.kind_of? Array
    assert_equal SkillLevel.all.first.id, 0
    assert_equal SkillLevel.all.first.name, 'Not required'
  end
end
