json.array!(@acquirements) do |acquirement|
  json.extract! acquirement, :id, :level, :hacker_id, :skill_id
  json.url acquirement_url(acquirement, format: :json)
end
