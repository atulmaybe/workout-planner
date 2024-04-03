class ApplicationController < ActionController::API
    before_action :set_cors

    def set_cors
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    end

    def secret_key
      "workoutPlanner"
    end 

    def encode_token(playload)
      JWT.encode(playload,secret_key,'HS256')
    end

    def decode_token(token)
      JWT.decode(token,secret_key,true,{algorithm: "HS256"})[0]      
    end

    def get_token
      request.headers["Authorization"]
    end

    def get_user
      User.find(decode_token(get_token)["user_id"])      
    end

    def current_user
      user ||= User.find_by(id: get_user)
    end

    def logged_in?
      !!current_user
    end

end
