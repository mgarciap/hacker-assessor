require './config/application'

def json_body
  JSON.parse req.body.read, symbolize_names: true
end

def merge_id_in_attr attrs
  attrs.to_a.map { |attr| attr.attributes.merge id: attr.id }
end

Cuba.define do
  res.headers['Content-Type'] = 'application/json'

  on root do
    render 'index.html'
  end

  on 'signup' do
    on get do
    end

    on post do
    end
  end

  on post, 'login' do
  end

  on 'hackers/:id' do |id|
    hacker = Hacker[id]

    on get, root do
      res.write hacker.attributes.to_json
    end

    on 'seniorities' do
      on get, ':id' do |id|
        # muestra que falta para un seniority
        seniority = Seniority[id]
      end

      on post do
        # carga skills y level de un hacker
        hacker.update seniority: seniority
      end
    end
  end

  on 'seniorities' do
    on root do
      on post do
        Seniority.create json_body[:seniority]
        res.status = 201
      end

      on get do
        seniorities = merge_id_in_attr Seniority.all.to_a
        res.write seniorities.to_json
      end
    end

    on ':id' do |id|
      seniority = Seniority[id]

      on 'requirements' do
        on post do
          requirements = json_body[:requirements]
          requirements.each do |reqmts|
            Requirement.create seniority: seniority,
              skill: Skill[reqmts[:skill]]
          end
          res.status = 201
        end

        on get do
          requirement = merge_id_in_attr Requirement.all.to_a
          res.write requirement.to_json
        end
      end
    end
  end

  on 'skills' do
    on root do
      on post do
        Skill.create json_body[:skill]
        res.status = 201
      end

      on get do
        skills = merge_id_in_attr Skill.all.to_a
        res.write skills.to_json
      end
    end

    on get, ':id' do |id|
      res.write Skill[id].attributes.to_json
    end
  end

end
