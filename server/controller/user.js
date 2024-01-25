const UserModel = require('../models/user');
const nodemailer = require('nodemailer');

module.exports.signup = (req, res) => {
    console.log(req.body);

    // Email should not exist already
    UserModel.findOne({ email: req.body.email }).then(existingUser => {
        if (existingUser) {
            res.send({ code: 409, message: 'Email already registered' });
        } else {
            const newUser = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            newUser
                .save()
                .then(() => {
                    res.send({ code: 200, message: 'Signup success' });
                })
                .catch((err) => {
                    res.send({ code: 500, message: 'Signup error' });
                });
        }
    });
};

module.exports.signin = (req, res) => {
    console.log(req.body.email);

    // Email and password match
    UserModel.findOne({ email: req.body.email })
        .then(result => {
            console.log(result, '11');

            // Match password with req.body.password
            if (result.password !== req.body.password) {
                res.send({ code: 404, message: 'Password incorrect' });
            } else {
                res.send({
                    email: result.email,
                    username: result.username,
                    code: 200,
                    message: 'User found',
                    token: 'srinu'
                });
            }
        })
        .catch(err => {
            res.send({ code: 500, message: 'User not found' });
        });
};



