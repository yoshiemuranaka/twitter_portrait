Rails.application.routes.draw do
  
  root 'session#index'
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'
  
  get '/account/new' => 'account#new'
  get '/account' => 'account#show'
  
  post '/users' => 'users#create'
  
  get '/users/tweets' => 'tweets#show'

end
