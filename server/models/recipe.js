// recipe model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Recipe = new Schema({
  name: String,
  creator: String,
  description: String,
  servings: Number,
  ingredients: [{
  	name: String,
  	amount: Number,
  	unit: String
  }]
});

module.exports = mongoose.model('recipe', Recipe);