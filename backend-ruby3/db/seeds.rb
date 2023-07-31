# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Phrase.create!(phrase: 'Single Ladies', difficulty: 'easy')
Phrase.create!(phrase: 'Ring Of Fire', difficulty: 'easy')
Phrase.create!(phrase: 'My Way', difficulty: 'medium')
Phrase.create!(phrase: 'Piano Man', difficulty: 'easy')
Phrase.create!(phrase: 'Genie In A Bottle', difficulty: 'medium')
Phrase.create!(phrase: 'Hello', difficulty: 'easy')
Phrase.create!(phrase: 'Shake It Off', difficulty: 'medium')
Phrase.create!(phrase: 'Let It Go', difficulty: 'medium')
Phrase.create!(phrase: 'California Dreamin', difficulty: 'medium')
Phrase.create!(phrase: 'Snowman', difficulty: 'easy')
Phrase.create!(phrase: 'These Boots are Made for Walking', difficulty: 'medium')
puts 'Created Phrases'
