class CreateWorkouts < ActiveRecord::Migration[7.0]
  def change
    create_table :workouts do |t|
      t.string :title
      t.datetime :workout_date
      t.text :workpout_desc
      t.string :workout_type
      t.references :users, null: false, foreign_key: true

      t.timestamps
    end
  end
end
