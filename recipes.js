const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


          const recipeSchema = new Schema({
            title: {
              type: String,
              require: true,
              unique: true
            },
            level: {
              type: String,
              enum: [ 'Easy Peasy', 'Amateur Chef', 'UltraPro Chef' ]
            },
            ingredients: [ String ],
            cousine: {
              type: String,
              required: true
            },
            dishType: {
              type: String,
              enum: [ "Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other" ]
            },
            image:{
              type: String,
              default: "https://images.media-allrecipes.com/images/75131.jpg"
            },
            duration: {type: Number,min: 0},
            creator: String,
            created: {
              type: Date,
              default: Date.now
            }
          });

      const Recipe = mongoose.model('Recipe', recipeSchema);

      module.exports= Recipe;

        Recipe.create( {
          title: 'Copy and Paste',
                level: 'Amateur Chef',
                ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
                cousine: 'Asian',
                dishType: ['Dish'],
                image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
                duration: 40,
                creator: 'Chef LePapu'
        })
        .then( newRecipe => {
          console.log( "MY NEW RECIPE -->", newRecipe)
        })
        .catch( err => console.log( "ERROR --> ", err))

          Recipe.insertMany(data)
          .then(recipes => console.log("My recipes" , recipes))
          .catch(err => console.log("err " , err))



          Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
          .then(recipe => console.log("My recipes" , recipe))
          .catch(err => console.log("err " , err))

          Recipe.deleteOne({title:"Carrot Cake"})
          .then(recipe => console.log("My recipes" , recipe))
          .catch(err => console.log("err " , err))
