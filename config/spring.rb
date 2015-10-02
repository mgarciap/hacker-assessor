# the default form builder is setup in an initializer, so spring keeps an old
# reference, lets update that reference to stop surprices.
Spring.after_fork do
  ActionView::Base.default_form_builder = CustomFormBuilder
end
