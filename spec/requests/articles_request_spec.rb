# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Articles', type: :request do
  let(:first_article) { create(:article) }
  let(:discarded_article) { create(:article, discarded_at: DateTime.now) }
  let(:delete_article_endpoint) { '/api/v1/' }

  context 'authenticated users' do
    before(:all) do
      user = create(:user)
      sign_in user
    end

    it 'should be able to delete articles' do
      delete "/api/v1/articles/#{first_article.id}"
      response_body = JSON.parse(response.body)

      expect(response_body.count).to eq 2
      expect(response_body.keys).to include 'id', 'discarded_at'
      expect(response_body['id']).to eq first_article.id
    end

    it 'should be able to edit articles' do
      patch "/api/v1/articles/#{first_article.id}", params: { title: 'Some New Title' }
      response_body = JSON.parse(response.body)

      expect(response_body['data']['id']).to eq first_article.id.to_s
      expect(response_body['data']['attributes']['title']).to eq 'Some New Title'
    end

    it 'should be able to recover articles' do
      post "/api/v1/articles/#{discarded_article.id}/recover"
      response_body = JSON.parse(response.body)

      expect(response_body['data']['id']).to eq discarded_article.id.to_s
      expect(response_body['data']['attributes']['title']).to eq discarded_article.title
      expect(response_body['data']['attributes']['discarded_at']).to be_nil
    end
  end

  context 'unauthenticated users' do
    it 'should not be able to delete articles' do
      delete "/api/v1/articles/#{first_article.id}"
      response_body = JSON.parse(response.body)

      expect(response_body.count).to eq 1
      expect(response_body['error']).to eq 'Access Denied'
    end

    it 'should not be able to edit articles' do
      patch "/api/v1/articles/#{first_article.id}", params: { title: 'Some New Title' }
      response_body = JSON.parse(response.body)

      expect(response_body.count).to eq 1
      expect(response_body['error']).to eq 'Access Denied'
    end

    it 'should not be able to recover articles' do
      post "/api/v1/articles/#{discarded_article.id}/recover"
      response_body = JSON.parse(response.body)

      expect(response_body.count).to eq 1
      expect(response_body['error']).to eq 'Access Denied'
    end
  end

  context 'any user' do
    before(:all) do
      # need some articles in the test database for retrieving
      create(:article).save
      create(:article).save
    end

    it 'should be able to view all articles' do
      get '/api/v1/articles/'
      response_body = JSON.parse(response.body)

      expect(response_body['data'].count).to eq Article.count
    end

    it 'should be able to view specific articles' do
      get "/api/v1/articles/#{Article.first.id}"
      response_body = JSON.parse(response.body)

      expect(response_body.count).to eq 1
      expect(response_body['data']['id']).to eq Article.first.id.to_s
    end

    after(:all) do
      Article.delete_all
    end
  end
end
