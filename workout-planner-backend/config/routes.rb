Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'signup', to:'registrations#create'
  post 'login', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'
  get 'userInfo/:id', to:'sessions#userInfo'

  post 'workout/add', to: 'workouts#create'
  get 'allworkouts', to:'workouts#allworkout'
  get 'myworkouts', to:'workouts#myworkouts'
  get 'workout/:id', to:'workouts#workoutDetail'
  delete '/workout/:id', to: 'workouts#destroy'
  put 'workout/:id', to: 'workouts#update' 
  get 'assignedWorkouts', to: 'assignments#assignedWorkouts'
  post 'workout/assign', to: 'assignments#assignUser'
  post 'workout/comments', to: 'comments#addComment'
  get 'workout/comments/:id', to: 'comments#getAllComments'
end
