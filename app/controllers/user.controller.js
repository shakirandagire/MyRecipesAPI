const User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config')

exports.signup_user = (req, res, next) => {
    var hashedPassword = bcrypt.hashSync(req.body.hashedPassword, 8);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        hashedPassword: hashedPassword
    })

    user.save((err)=>{
        if(err){
            return res.status(500).send('There is a problem with registering');
        }
        res.status(201).send('User successfully signed up')
        })
}

exports.login_user = (req, res, next) => {
    User.findOne({
        email: req.body.email,
    }, (err, user) => {
        if (err) next(err);
        if (!user) {
            return res.status(401).send({message: 'Authentication failed. User not found.'});
        }else if(user){
            if(!bcrypt.compareSync(req.body.hashedPassword, user.hashedPassword)){
                return res.status(401).send({message: 'Incorrect Password. Please re-enter it.'});
            }
            return res.status(200).send({token: jwt.sign({ id: user._id }, config.secret, {expiresIn: 86400}, 
                "User successfully logged in")  
            })
        }
        
        

        }
    )
    }
    
    