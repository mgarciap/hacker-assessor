module ApplicationHelper
  def md5 string
    Digest::MD5.hexdigest string
  end
end
