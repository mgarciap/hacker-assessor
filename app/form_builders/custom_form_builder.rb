class CustomFormBuilder < ActionView::Helpers::FormBuilder
  def experience_level_select attribute = :level
    select attribute, ExperienceLevel.options,
      selected: object.public_send(attribute).to_i
  end

  def skill_select attribute = :skill_id
    collection_select attribute, Skill.all, :id, :name, prompt: true
  end
end
