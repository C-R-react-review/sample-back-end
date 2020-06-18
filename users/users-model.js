const db = require('../data/dbConfig');
const jwt = require('jsonwebtoken');
const secrets = require("../config/secrets.js");
const {} = require("../helpers/helpers")

module.exports = {
    add,
    find,
    findByUsername,
    findById,
    findByToken,
    edit,
    destroy,
    findFriendsById,
    addFriend,
    acceptFriend
};

function add(user) {
    return db("users").insert(user)
}

function find() {
    return db('users')
}

function findByUsername(username) {
    return db('users').where({ username }).first();
}

function findById(id) {
    return db('users').where({ id }).first();
}

function findByToken(token) {
    const decoded = jwt.verify(token, secrets.jwtSecret).subject
    return findById(decoded)
}

function edit(user, id) {
    return db('users').where({ id }).update(user)
}

function destroy(id) {
    return db('users').where({ id }).delete();
}

function addFriend(friendRequest) {
    return db('friends').insert(friendRequest);
}

function acceptFriend(user_id, friend_id) {
    return db('friends').where({ user_id }).andWhere({ friend_id }).update({ "accepted": true })
}

function findFriendsById(user_id) {
    return db('friends')
    .where({ user_id })
    .join('users', 'friends.friend_id', '=', 'users.id')
    .select('friends.user_id', 'friends.friend_id', 'friends.accepted', 'users.first_name', 'users.last_name', 'users.username');
}