require "./config/#{ ENV['RACK_ENV'] || 'development' }"
require 'cuba'
require 'ohm'

Dir["./models/*.rb"].each { |rb| require rb }

Ohm.redis = Redic.new(ENV['REDISCLOUD_URL'] || 'redis://127.0.0.1:6379')
