class Acquirement < ActiveRecord::Base
  belongs_to :hacker
  belongs_to :skill
end
