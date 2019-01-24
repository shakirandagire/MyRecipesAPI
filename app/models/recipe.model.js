const Category = require('../models/category.model')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecipeSchema = new Schema({
    recipeName: {
        type: String,
        required: true,
        max: 100
    },
    recipeDescription: {
        type: String,
        required: true,
        max: 200
    },
    recipeInstructions: {
        type: String,
        required: true,
        max: 300
    },
    categoryId: {
        type: String,
        ref: Category
    }

});

module.exports = mongoose.model('Recipe', RecipeSchema)