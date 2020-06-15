# frozen_string_literal: true

module CurrentUserConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
  end

  # if there is a current user, set the session with their ID
  def set_current_user
    @current_user = User.find(session[:user_id]) if session[:user_id]
  end
end
