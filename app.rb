require './config/application'

def json_body
  JSON.parse req.body.read, symbolize_names: true
end

def merge_id_in_attr attrs
  attrs.to_a.map { |attr| attr.attributes.merge id: attr.id }
end

def get_skills lists
  lists.to_a.map { |list| list.skill }
end

Cuba.define do
  res.headers['Content-Type'] = 'application/json'

  on 'signup' do
    on get do
    end

    on post do
    end
  end

  on post, 'login' do
  end

  on 'hackers' do
    on get, root do
      hackers = merge_id_in_attr Hacker.all.to_a
      res.write hackers.to_json
    end

    on ':id' do |id|
      hacker = Hacker[id]

      on 'acquirements' do
        on post do
          acquirements = json_body[:acquirements]
          acquirements.each do |reqmts|
            Acquirement.create hacker: hacker,
              skill: Skill[reqmts[:skill]]
          end
          res.status = 201
        end

        on get do
          acqmts = get_skills hacker.acquirements
          acquirements = merge_id_in_attr acqmts
          res.write acquirements.to_json
        end
      end

      on 'seniorities' do
        on get, root do
          # TODO: This need to return a list of seniorities or "careers"
          # to reach by a hacker.
        end

        on get, ':id' do |id|
          seniority = Seniority[id]

          # TODO: Return the difference between the acquirements for a hacker
          # and the requirementes for a selected seniority.
          # i.e. The "Skills" that a hacker need to reach for the next seniority.
        end
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
          reqmts = get_skills seniority.requirements
          requirements = merge_id_in_attr reqmts
          res.write requirements.to_json
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
