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
FactoryBot.define do
  factory :article do
    title { Faker::Lorem.sentence(word_count: 2) }
    content { Faker::Lorem.paragraphs(number: 1) }
    discarded_at { nil }
    association :user, factory: :user
  end
end
