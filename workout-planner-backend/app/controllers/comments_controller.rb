class CommentsController < ApplicationController

    def new
        @comment = Comment.new
    end

    def addComment
        @comment = Comment.new(comments_params)
        if @comment.save
            user = User.find_by(email:comments_params[:author])
            comment = CommentDetai.new(comments_params[:body],user[:name])
            render json: comment.to_json
        else
            render json: "Fialed".to_json
        end
    end
    def comments_params
        params.permit(:author,:body,:workout_id)
    end

    def getAllComments
        @comments = Comment.where(workout_id:params[:id])
        @allComments = []
        for c in @comments
            user = User.find_by(email:c[:author])
            comment = CommentDetai.new(c[:body],user[:name])
            @allComments.append(comment)
        end
        render json: @allComments.to_json
    end
end
