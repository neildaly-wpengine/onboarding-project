# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'SessionsControllers', type: :request do
  before(:all) do
    @logged_in_endpoint = '/logged_in'
    @login_endpoint = '/sessions'
    @logout_endpoint = '/logout'
    @user = create(:user)
  end

  def login_user
    post @login_endpoint, params: { 'user': { 'email': @user.email, 'password': @user.password } }
  end

  context 'unauthenticated users' do
    it 'should not have a session' do
      get @logged_in_endpoint
      response_body = JSON.parse(response.body)

      expect(response_body['logged_in']).to be false
    end

    it 'should be able to login' do
      login_user
      response_body = JSON.parse(response.body)

      expect(response_body['logged_in']).to be true
    end
  end

  context 'authenticated users' do
    it 'should be able to logout' do
      delete @logout_endpoint
      response_body = JSON.parse(response.body)

      expect(response_body['logged_out']).to be true
    end

    it 'should be logged in' do
      login_user
      get @logged_in_endpoint
      response_body = JSON.parse(response.body)

      expect(response_body['logged_in']).to be true
    end
  end
end
