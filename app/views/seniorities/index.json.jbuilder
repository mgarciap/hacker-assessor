json.array!(@seniorities) do |seniority|
  json.extract! seniority, :id, :name
  json.url seniority_url(seniority, format: :json)
end
