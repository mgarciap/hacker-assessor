ENV['RACK_ENV'] = 'test'
ENV['REDISCLOUD_URL'] = 'redis://localhost:6379/2'
require './app'
require './tests/migration'

prepare do
  Ohm.flush
  all
end
