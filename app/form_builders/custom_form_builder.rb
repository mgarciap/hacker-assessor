class CustomFormBuilder < ActionView::Helpers::FormBuilder
  def skill_level_select attribute = :level
    collection_select attribute, SkillLevel.all, :id, :name
  end
end
