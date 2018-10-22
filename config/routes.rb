Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope "/api" do
    resources :drinks
    resources :ingredients
    resources :providers
    resources :patients do
      resources :allergies
      resources :vitals
      resources :immunizations
      resources :prescriptions
      resources :conditions
      resources :appointments do
        resources :soaps
      end
    end
  end

  root "patients#show"

  match "*path", to: "patients#show", via: :all
end
