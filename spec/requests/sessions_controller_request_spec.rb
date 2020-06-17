# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Sessions', type: :request do
  let(:user) { create(:user) }

  context 'unauthenticated users' do
    it 'should not have a session' do
      check_authenticated
      response_body = JSON.parse(response.body)

      expect(response_body['logged_in']).to be false
    end

    it 'should be able to login' do
      sign_in user
      response_body = JSON.parse(response.body)

      expect(response_body['logged_in']).to be true
    end
  end

  context 'authenticated users' do
    it 'should be able to logout' do
      sign_out
      response_body = JSON.parse(response.body)

      expect(response_body['logged_out']).to be true
    end

    it 'should be logged in' do
      sign_in user
      response_body = JSON.parse(response.body)

      expect(response_body['logged_in']).to be true
    end
  end
end
