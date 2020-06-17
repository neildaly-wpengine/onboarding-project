# frozen_string_literal: true

module AuthHelper
  def sign_in(user)
    login_endpoint = '/api/v1/sessions'

    post login_endpoint, params: { 'user': { 'email': user.email, 'password': user.password } }
  end

  def sign_out
    logout_endpoint = '/api/v1/logout'

    delete logout_endpoint
  end

  def check_authenticated
    logged_in_endpoint = '/api/v1/logged_in'

    get logged_in_endpoint
  end
end

module RegistrationHelper
  def register(user)
    registration_endpoint = '/api/v1/registrations/'

    post registration_endpoint, params: {
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
