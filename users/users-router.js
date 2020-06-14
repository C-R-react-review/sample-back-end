const express = require("express");
const router = express.Router();
const Users = require('./users-model');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id

    Users.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/dashboard/:token', (req, res) => {
    const token = req.params.token

    Users.findByToken(token)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id
    Users.edit(req.body, id)
        .then(user => {
            console.log(user)
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

router.get('/friends/:id', (req, res) => {
    const id = req.params.id

    Users.findFriendsById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/friends/:id', (req, res) => {
    const id = req.params.id
    const friend = req.body.friend

    Users.findFriendsById({ 'user_id': id, 'friend_id': friend })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router
