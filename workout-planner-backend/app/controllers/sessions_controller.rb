class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user =User.find_by(email:params[:email])
    if @user&.authenticate(params[:password])
      playload = {user_id:@user[:id]}
      token = encode_token(playload)
      puts(token)
      render json:{userId: @user[:id] ,userName: @user[:name], userEmail: @user[:email], role: @user[:role], token:token}
    else
       render json: "Inccorect passowrd or email"
    end
  end

  def userAuthentication
    token = request.headers["Authorization"]
    user = User.find(decode(token)["user_id"])
  end

  def destroy
    session[:user_id] =nil
    redirect_to login_path
  end

  def userInfo
    user = User.find(params[:id])
    if user
      render json: user.to_json
    end

  end 

end
