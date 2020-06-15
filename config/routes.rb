# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#index'

  namespace :api do
    namespace :v1 do
      # sessions
      resources :sessions, only: %i[create]
      resources :registrations, only: %i[create]
      delete :logout, to: 'sessions#logout'
      get :logged_in, to: 'sessions#logged_in'
    end
  end
end
