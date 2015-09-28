require "./config/#{ ENV['RACK_ENV'] || 'development' }"
require 'cuba'
require 'ohm'
require 'ohm/json'
require 'json'
require 'sass/plugin/rack'
require 'bourbon'
require 'neat'

Dir["./models/*.rb"].each { |rb| require rb }
Cuba.use Rack::Session::Cookie, secret: '__a_very_long_string__'
Ohm.redis = Redic.new(ENV['REDISCLOUD_URL'] || 'redis://127.0.0.1:6379')

# Setup a custom configuration for the Sass Rack plugin.
Sass::Plugin.options[:css_location] = './public/css'
Sass::Plugin.options[:template_location] = './sass'

# Use the Sass Rack plugin with Cuba.
Cuba.use Sass::Plugin::Rack

Cuba.use Rack::Static,
  :urls => ["/css", "/images", "/js"],
  :root => 'public'

Cuba.use Rack::Static,
  :urls => "/",
  :root => 'public',
  :index => 'index.html'
