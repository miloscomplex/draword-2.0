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

ActiveRecord::Schema[7.0].define(version: 2021_05_24_061150) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "canvas", force: :cascade do |t|
    t.string "action"
    t.integer "offsetX"
    t.integer "offsetY"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "room_id", null: false
    t.index ["room_id"], name: "index_canvas_on_room_id"
  end

  create_table "chats", force: :cascade do |t|
    t.string "text"
    t.string "name"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "room_id", null: false
    t.index ["room_id"], name: "index_chats_on_room_id"
  end

  create_table "phrases", force: :cascade do |t|
    t.string "phrase"
    t.string "difficulty"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms", force: :cascade do |t|
    t.string "title"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "selected_phrase_id"
    t.bigint "drawer_id"
    t.index ["drawer_id"], name: "index_rooms_on_drawer_id"
    t.index ["selected_phrase_id"], name: "index_rooms_on_selected_phrase_id"
  end

  create_table "scores", force: :cascade do |t|
    t.integer "points"
    t.integer "time_in_seconds"
    t.string "canvas_img"
    t.string "phrase"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "room_id", null: false
    t.index ["room_id"], name: "index_scores_on_room_id"
  end

  create_table "timers", force: :cascade do |t|
    t.integer "time"
    t.boolean "is_on"
    t.integer "start"
    t.bigint "room_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_timers_on_room_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "initials"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "room_id"
    t.index ["room_id"], name: "index_users_on_room_id"
  end

  add_foreign_key "canvas", "rooms"
  add_foreign_key "chats", "rooms"
  add_foreign_key "rooms", "users", column: "drawer_id"
  add_foreign_key "scores", "rooms"
  add_foreign_key "timers", "rooms"
  add_foreign_key "users", "rooms"
end
