class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.integer :points
      t.integer :time_in_seconds
      t.string :canvas_img
      t.string :phrase
      # t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
