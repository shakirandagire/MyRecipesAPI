const express = require('express');
const router = express.Router();
const userToken = require('../models/userToken');

const recipe_controller =  require('../controllers/recipe.controller')

router.post('/create',userToken, recipe_controller.recipe_create);
router.get('/view',userToken, recipe_controller.recipe_view);
router.get('/:id',userToken, recipe_controller.recipe_details);
router.delete('/:id/delete',userToken, recipe_controller.recipe_delete);
router.put('/:id/update',userToken, recipe_controller.recipe_update);

module.exports = router;