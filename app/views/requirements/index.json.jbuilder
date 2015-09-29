json.array!(@requirements) do |requirement|
  json.extract! requirement, :id, :level, :seniority_id, :skill_id
  json.url requirement_url(requirement, format: :json)
end
