const Category = require('../models/category.model')

exports.test = (req, res) => {
    res.status(200).send('Greetings from the test controller')
}

exports.category_create = (req, res, next) => {
    let category = new Category(
        {
            name: req.body.name,
            description: req.body.description,
            userId: req.currentUser.id
        }
    );
    category.save((err)=>{
        if(err){
            return next(err);
        }
        res.status(201).send({category: category, message: 'Category created successfully'});
    })
};

exports.category_details = (req, res, next) => {
    Category.findById(req.params.id,(err, category) => {
        if (err) return next(err);
        res.status(200).send(category);
    })
};

exports.category_view = (req, res, next) => {
    Category.find((err, category) => {
        if (err) return next(err);
        res.status(200).send(category);

    })
}

exports.category_update = (req, res, next) => {
    Category.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, category) => {
        if (err) return next(err);
        res.status(200).send('Category udpated.');
    });
};

exports.category_delete = (req, res, next) =>{
    Category.findByIdAndRemove(req.params.id, (err) =>{
        if (err) return next(err);
        res.status(200).send('Deleted successfully!');
    })
}