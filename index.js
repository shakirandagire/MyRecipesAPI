const express = require('express');
const bodyParser = require('body-parser');

const category = require("./app/routes/category.route");
const recipe = require("./app/routes/recipe.route");
const user = require("./app/routes/user.route");

const app = express();

const  env = process.env.NODE_ENV;
const mongoose = require('mongoose');

if(env === 'test') {
    mongoose.connect('mongodb://someuser:abcd1234@ds217452.mlab.com:17452/recipestestdb')
  } else {
    mongoose.connect('mongodb://someuser:abcd1234@ds157574.mlab.com:57574/recipesdb')
  }
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/category', category);
app.use('/category/:id/recipe', recipe);
app.use('/user', user);

const port = 8000;

app.listen(port,()=>{
    console.log('We are live on port', port)
})

module.exports.app = app
module.exports.db = db