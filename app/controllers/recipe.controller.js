const Recipe = require('../models/recipe.model');
const Category = require('../models/category.model');

exports.recipe_create = (req, res, next) => {
    let recipe = new Recipe({
        recipeName: req.body.recipeName,
        recipeDescription: req.body.recipeDescription,
        recipeInstructions: req.body.recipeInstructions,
        categoryId: req.params.id
    });
    Category.findById(req.params.id,
    recipe.save((err) => {
        if(err){
            return next(err)
        }
        res.status(201).send('Recipe created successfully')
    })
    )}

exports.recipe_view = (req, res, next) => {
    Recipe.find((err, recipe) => {
        if (err) return next(err);
        res.status(200).send(recipe);

    })
}

exports.recipe_details = (req, res, next) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (err) return next(err);
        res.status(200).send(recipe);

    })
}

exports.recipe_delete = (req, res, next) => {
    Recipe.findByIdAndDelete(req.params.id, (err, recipe) => {
        if (err) return next(err);
        res.status(200).send('Recipe deleted');

    })
}

exports.recipe_update = (req, res, next) => {
    Recipe.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, recipe) => {
        if (err) return next(err);
        res.status(200).send('Recipe updated');

    })
}