# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ArticlesController, type: :routing do
  before(:all) do
    @articles_endpoint = 'api/v1/articles'
  end

  describe 'routing' do
    it 'routes to #index' do
      expect(get: "/#{@articles_endpoint}").to route_to("#{@articles_endpoint}#index")
    end

    it 'routes to #show' do
      expect(get: "/#{@articles_endpoint}/1").to route_to("#{@articles_endpoint}#show", id: '1')
    end

    it 'routes to #create' do
      expect(post: "/#{@articles_endpoint}").to route_to("#{@articles_endpoint}#create")
    end

    it 'routes to #update via PUT' do
      expect(put: "/#{@articles_endpoint}/1").to route_to("#{@articles_endpoint}#update", id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: "/#{@articles_endpoint}/1").to route_to("#{@articles_endpoint}#update", id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: "/#{@articles_endpoint}/1").to route_to("#{@articles_endpoint}#destroy", id: '1')
    end
  end
end
