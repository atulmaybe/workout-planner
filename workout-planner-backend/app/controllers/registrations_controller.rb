class RegistrationsController < ApplicationController

    def new
      @user = User.new
    end
  
    def create
      @user = User.new(reg_params)
      if @user.save
        @token = @user[:id]
        session[:user_id]=@token
        render json: @token.to_json playload = {user_id:@user[:id]}
        token = encode_token(playload)
        puts(token)
        render json:{userId: @user[:id] ,userName: @user[:name], userEmail: @user[:email], role: @user[:role], token:token}
      else
         render json: "Something Went Wrong"
      end
    end
  
    def reg_params
      params.permit(:name,:email, :role, :password, :password_confirmation)
    end
end
