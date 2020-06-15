# frozen_string_literal: true

case Rails.env
when 'development'
  Rails.application.config.session_store :cookie_store, key: '_blogging_app'
end
