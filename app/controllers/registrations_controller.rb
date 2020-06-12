# frozen_string_literal: true

class RegistrationsController < ApplicationController
  def create
    user = User.create!(
      email: params['user']['email'],
      password: params['user']['password'],
      password_confirmation: params['user']['password_confirmation']
    )

    if user
      session[:user_id] = user.id
      render json: { status: :created, user: user }
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { status: 422, message: e.record.errors }
  end
end
