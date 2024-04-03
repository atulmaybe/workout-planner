# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_06_105220) do
  create_table "assignments", force: :cascade do |t|
    t.string "assigned_by"
    t.string "assigned_to"
    t.integer "user_id", null: false
    t.integer "workout_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_assignments_on_user_id"
    t.index ["workout_id"], name: "index_assignments_on_workout_id"
  end

  create_table "comments", force: :cascade do |t|
    t.string "author"
    t.string "body"
    t.integer "workout_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workout_id"], name: "index_comments_on_workout_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "role"
    t.string "password_digest"
    t.string "password_confirmation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "workouts", force: :cascade do |t|
    t.string "title"
    t.datetime "workout_date"
    t.text "workout_desc"
    t.string "workout_type"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_workouts_on_users_id"
  end

  add_foreign_key "assignments", "users"
  add_foreign_key "assignments", "workouts"
  add_foreign_key "comments", "workouts"
  add_foreign_key "workouts", "users"
end
