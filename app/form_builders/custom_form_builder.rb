class CustomFormBuilder < ActionView::Helpers::FormBuilder
  def skill_level_select attribute = :level
    collection_select attribute, SkillLevel.all, :id, :name
  end

  def skill_select attribute = :skill_id
    collection_select attribute, Skill.all, :id, :name, prompt: true
  end
end
