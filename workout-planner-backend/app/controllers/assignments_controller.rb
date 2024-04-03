class AssignmentsController < ApplicationController
    def new
        @assigment = Assignment.new
    end
    def assignUser
        @allAsignment = Assignment.all
        @canAssign = true
        @allAsignment.each do |a|
        @assignedTos = Assignment.where( assigned_to: params[:assigned_to])
        @assignedBys = Assignment.where(params[:assigned_by])
        if params[:assigned_to]== a[:assigned_to]
            if params["workout_id"].to_i == a[:workout_id].to_i 
              @canAssign = false
            end
          end
        end 
        if @canAssign
            @assignment = Assignment.create(assignment_params)
            if @assignment.save
                 render jsonL: :status.to_json
            else
                format.json { render json: @assignment.errors, status: :unprocessable_entity }
            end
        else
            render json: "Already SucessFully".to_json
        end
    end
    def assignment_params
        params.permit(:assigned_to,:assigned_by, :user_id, :workout_id)
    end

    def assignedWorkouts
        if logged_in?
            @user= get_user
            @assignments = Assignment.where(assigned_to:@user[:email])
            @workouts =Workout.all
            @workout_ids =[]
            for w in @assignments
                @workout_ids.append(w[:workout_id])
            end
            @assignedWorkouts = Workout.where(id: @workout_ids)
            if @assignedWorkouts
                render json: @assignedWorkouts.to_json
            else
                render json:  "Error".to_json
            end
        else
            render json: "Incorrect UserInfo".to_json  
        end
    end 
end
