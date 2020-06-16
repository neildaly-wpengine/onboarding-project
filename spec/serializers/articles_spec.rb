# frozen_string_literal: true

require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe ArticleSerializer do
  let(:article) { create(:article) }
  let(:serialized_hash) { ArticleSerializer.new(article).serializable_hash[:data][:attributes] }

  context 'article serializers' do
    it 'should include the correct title' do
      expect(serialized_hash[:title]).to eq(article.title)
    end

    it 'should include the correct content' do
      expect(serialized_hash[:content]).to eq(article.content)
    end

    it 'should include the correct user_id' do
      expect(serialized_hash[:user_id]).to eq(article.user_id)
    end

    it 'should include the correct creation date' do
      expect(serialized_hash[:created_at]).to eq(article.created_at)
    end

    it 'should include the correct updated date' do
      expect(serialized_hash[:updated_at]).to eq(article.updated_at)
    end
  end
end