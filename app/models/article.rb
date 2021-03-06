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
#  archived     :boolean          default(FALSE)
#
class Article < ApplicationRecord
  include Discard::Model

  belongs_to :user
  validates :title, :content, :user_id, presence: true
end
