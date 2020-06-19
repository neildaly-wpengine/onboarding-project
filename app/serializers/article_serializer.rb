# == Schema Information
#
# Table name: articles
#
#  id           :integer          not null, primary key
#  title        :string
#  content      :text
#  user_id      :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  discarded_at :datetime
#
class ArticleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :content, :user_id, :created_at, :updated_at, :discarded_at
end
