class Career < ActiveRecord::Base
  has_many :hackers
  has_many :requirements
end
