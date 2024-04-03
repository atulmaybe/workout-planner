class WorkoutsController < ApplicationController

    def new
        @workout = Workout.new
    end

    def create
        @workout = Workout.new(workout_params)
        if @workout.save
            render json: "created".to_json
        else
            render json: "Something Went Wrong".to_json
        end
      end

    def workout_params
        params.require(:workout).permit(:title, :workout_date, :workout_desc, :user_id, :workout_type)
    end

    def allworkout
        if logged_in?
            @workouts = Workout.where(workout_type:"Public")
            @canAssign =false
            @user= get_user
            if @user[:role]=='trainer'
                @canAssign=true
            end
            @allworkouts = []
            for w in @workouts
                if @user[:id] !=w[:user_id]
                    @workout = WorkoutDetail.new(w,@canAssign)
                    @allworkouts.append(@workout)
                end          
            end
            render json:  @allworkouts.to_json
        else
            render json: "Incorrect UserInfo".to_json
        end
    end
    def myworkouts
        if logged_in?
            @user= get_user
            @workouts = Workout.where(user_id:@user[:id])
            @canAssign =false
            if @user[:role]=='trainer'
                @canAssign=true
            end
            @allworkouts = []
            for w in @workouts
                if @user[:id] ==w[:user_id]
                    @workout = WorkoutDetail.new(w,@canAssign)
                    @allworkouts.append(@workout)
                end          
            end
            render json:  @allworkouts.to_json
        else 
            render json: "Incorrect UserInfo".to_json
        end
    end

    def workoutDetail
        if logged_in?
            @user= get_user
            @canEdit = false
            @canDelete = false
            @workout = Workout.find(params[:id])
            if @user[:id] == @workout[:user_id]
                @canEdit=true
                @canDelete =true
            end
            render json: {workout:@workout, canEdit:@canEdit, canDelete:@canDelete}
        else
            render json: "Incorrect UserInfo".to_json
        end
    end 
      # PATCH/PUT /workouts/1 or /workouts/1.json
    def update
        if logged_in?
            @workout= Workout.find(params[:id])
            if @workout
                @workout.update(workout_params)
                render json: "Edited Sucessfully".to_json
            else
                render json: "Failed".to_json
            end
        else
            render json: "Incorrect UserInfo".to_json  
        end
    end

  # DELETE /workouts/1 or /workouts/1.json
    def destroy
        @workout=Workout.find_by(id:params[:id])
        @assignments = Assignment.where(workout_id: @workout[:id])
        for assignment in @assignments
            assignment.destroy
        end
        @comments = Comment.where(workout_id:@workout[:id])
        for comment in @comments
            comment.destroy
        end
        @workout.destroy
        render json: :no_content
    end

end
