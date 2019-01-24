const categoryRoutes = require('./category.route');
const recipeRoutes = require('./recipe.route');
const userRoutes = require('./user.route')
module.exports = (app, db)=>{
    categoryRoutes(app, db);
    recipeRoutes(app, db);
    userRoutes(app,db);
}