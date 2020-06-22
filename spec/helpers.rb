# frozen_string_literal: true

module AuthHelper
  def sign_in(user)
    post api_v1_sessions_url, params: { 'user': { 'email': user.email, 'password': user.password } }
  end

  def sign_out
    delete api_v1_logout_url
  end

  def check_authenticated
    get api_v1_logged_in_url
  end
end

module RegistrationHelper
  def register(user)
    post api_v1_registrations_url, params: {
      'user': {
        'email': user.email,
        'password': user.password,
        'password_confirmation': user.password_confirmation
      }
    }
  end
end

module Helpers
  include AuthHelper
  include RegistrationHelper
end
