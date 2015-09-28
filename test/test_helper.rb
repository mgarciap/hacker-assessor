ENV['RACK_ENV'] = 'test'
ENV['REDISCLOUD_URL'] = 'redis://localhost:6379/2'
require './app'
require './test/lib/migration'

def body_json
  JSON.parse last_response.body, symbolize_names: true
end

prepare do
  Ohm.flush
  all
end
