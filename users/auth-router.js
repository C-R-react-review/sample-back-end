const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require("../config/secrets.js");

const Users = require('./users-model')
const {generateToken, validateUserContent} = require("../helpers/helpers")

router.use(express.json())

router.post('/register', validateUserContent, (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash
    Users.add(user)
    .then(savedId => {
        console.log(savedId[0])
        Users.findById(savedId[0])
        .then(saved => {
            console.log(saved)
            const token = generateToken(saved);
            res.status(201).json({
                saved,
                message: `${saved.username}`,
                token,
            });
        })
    })
    .catch(error => {
        res.status(500).json(error);
    });
})

router.post('/login', validateUserContent, (req, res) => {
    let { username, password } = req.body
    Users.findByUsername(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({
                    user,
                    message: `${user.username}`,
                    token,
                });
            } else {
                res.status(401).json({message: "Invalid Username or Password"})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        });
})

router.post('/authenticate', (req, res) => {
    const token = req.body.token
    console.log(token)
    const id = jwt.verify(token, secrets.jwtSecret).subject
    Users.findById(id)
    .then(user => {
        if (user) {
            res.status(200).json({
                message: true,
            })
        } else {
            res.status(401).json({message: false})
        }
    })
    .catch(error => {
        res.status(500).json({message: false})
    })
})



module.exports = router