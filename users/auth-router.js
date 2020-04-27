const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// secrets import

const Users = require('./users-model')

router.post('register', (req, res) => {
    let user = req.body;

    Users.add(user)
    .then(saved => {
        const token = generateToken(saved);
        res.status(201),json({
            saved,
            message: `${saved.username}`,
            token,
        });
    })
    .catch(error => {
        res.status(500).json(error);
    });
})