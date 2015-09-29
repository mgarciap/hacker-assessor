# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

%w[ applies_to_all_areas.csv devops.csv front_end.csv non_mesurable.csv
    ruby.csv ].each do |f|
  CSV.open Rails.root.join('db', 'seeds', f), headers: true do |t|
    t.each do |s|
      p Skill.find_or_create_by! name: s[0] if s[0]
    end
  end
end
