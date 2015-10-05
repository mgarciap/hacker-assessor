require 'test_helper'

class RunSeedsTest < ActiveSupport::TestCase
  test "seeds can be run" do
    load Rails.root.join('db', 'seeds.rb')
  end
end
