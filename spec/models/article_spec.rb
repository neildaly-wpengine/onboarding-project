# == Schema Information
#
# Table name: articles
#
#  id         :integer          not null, primary key
#  title      :string
#  content    :text
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe Article, type: :model do
  let(:article) { create(:article) }

  context 'invalid article' do
    it 'without a title' do
      article.title = nil
      expect(article).to_not be_valid
    end

    it 'without content' do
      article.content = nil
      expect(article).to_not be_valid
    end

    it 'without a user' do
      article.user = nil
      expect(article).to_not be_valid
    end
  end

  context 'valid article' do
    it 'with all attributes included' do
      expect(article).to be_valid
    end
  end
end
