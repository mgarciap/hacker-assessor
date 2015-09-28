def seniority_body
  { seniority: { name: 'Senior Ruby' } }.to_json
end

def requirements_body
  { requirements: [ { skill: '1' }, { skill: '2' } ] }.to_json
end

scope '/seniotities' do
  test 'Get all the seniorities' do
    get '/seniorities'
    assert_equal 200, last_response.status
    assert_equal seniority.name, body_json.first[:name]
  end

  test 'Create a seniority' do
    post '/seniorities', seniority_body
    seniorities = Seniority.all
    assert_equal 201, last_response.status
    assert_equal 2, seniorities.count
    assert_equal 'Senior Ruby', seniorities.to_a[1].attributes[:name]
  end

  test 'Create a list of Requirements for a seniority and get the requirements' do
    post "/seniorities/#{ seniority.id }/requirements", requirements_body
    assert_equal 201, last_response.status
    assert_equal 4, seniority.requirements.count

    get "/seniorities/#{ seniority.id }/requirements"
    assert_equal 200, last_response.status
    assert_equal 'TDD', body_json.first[:name]
  end
end
