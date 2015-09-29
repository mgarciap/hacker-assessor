json.array!(@skills) do |skill|
  json.extract! skill, :id, :name, :description
  json.url skill_url(skill, format: :json)
end
