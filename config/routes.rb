Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope '/api' do
    resources :drinks
    resources :ingredients
  end

  root 'drinks#index'

  match '*path', to: 'drinks#index', via: :all
end
