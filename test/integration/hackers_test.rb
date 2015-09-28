def acquirements_body
  { acquirements: [ { skill: '1' }, { skill: '2' } ] }.to_json
end

scope '/hackers' do
  test 'get a list of hackers' do
    get '/hackers'
    assert_equal 200, last_response.status
    assert_equal hacker.name, body_json.first[:name]
  end

  test 'Create a list of Acquirements for a hacker and get the acquirements' do
    post "/hackers/#{ hacker.id }/acquirements", acquirements_body
    assert_equal 201, last_response.status
    assert_equal 4, hacker.acquirements.count

    get "/hackers/#{ hacker.id }/acquirements"
    assert_equal 200, last_response.status
    assert_equal 'TDD', body_json.first[:name]
  end

  # TODO: Missing logic in the endpoint.
  # test 'Get a list of seniorities that a hacker can reach' do |hacker|
  #   get "/hackers/#{ hacker.id }/seniorities"
  # end

  test 'Return the skills that a hacker need to reach the next seniority' do
    get "/hackers/#{ hacker.id }/seniorities/#{ seniority.id }"
    assert_equal 200, last_response.status
    assert_equal 0, body_json.count
  end
end
