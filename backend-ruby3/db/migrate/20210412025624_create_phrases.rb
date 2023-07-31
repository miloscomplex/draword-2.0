class CreatePhrases < ActiveRecord::Migration[6.0]
  def change
    create_table :phrases do |t|
      t.string :phrase
      t.string :difficulty

      t.timestamps
    end
  end
end
