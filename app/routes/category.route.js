const express = require('express');
const router = express.Router();
const userToken = require('../models/userToken');

const category_controller = require('../controllers/category.controller');

router.get('/test', category_controller.test);
router.post('/create', userToken, category_controller.category_create);
router.get('/view', userToken, category_controller.category_view);
router.get('/:id', userToken, category_controller.category_details);
router.put('/:id/update', userToken, category_controller.category_update);
router.delete('/:id/delete', userToken, category_controller.category_delete);


module.exports = router;