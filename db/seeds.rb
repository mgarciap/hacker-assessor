# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

def acquirement_params
  [ {"level"=>"1", "skill_id"=>"52"},
    {"level"=>"2", "skill_id"=>"2"},
    {"level"=>"2", "skill_id"=>"10"},
    {"level"=>"3", "skill_id"=>"12"},
    {"level"=>"3", "skill_id"=>"44"} ]
end

def requirements_params
  [ {"skill_id"=>"52", "level"=>"3"},
    {"skill_id"=>"2", "level"=>"2"},
    {"skill_id"=>"10", "level"=>"3"},
    {"skill_id"=>"12", "level"=>"3"},
    {"skill_id"=>"44", "level"=>"3"},
    {"skill_id"=>"51", "level"=>"3"},
    {"skill_id"=>"3", "level"=>"2"},
    {"skill_id"=>"13", "level"=>"1"},
    {"skill_id"=>"8", "level"=>"0"} ]
end

%w[ applies_to_all_areas.csv devops.csv front_end.csv non_mesurable.csv
    ruby.csv ].each do |f|
  CSV.open Rails.root.join('db', 'seeds', f), headers: true do |t|
    t.each do |s|
      p Skill.find_or_create_by! name: s[0] if s[0]
    end
  end
end

hacker ||= Hacker.create email: 'jorge@altoros.com', password: 'jorge'
acquirement_params.each { |acq| hacker.acquirements.create acq }

seniority ||= Seniority.create name: 'Senior Frontend'
seniority.requirements.create requirements_params
