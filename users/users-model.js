const db = require('../data/dbConfig')
const jwt = require('jsonwebtoken')
const secrets = require("../config/secrets.js");


module.exports = {
    add,
    find,
    findByUsername,
    findById,
    findByToken,
    edit,
    destroy
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
    const decoded = jwt.verify(token, secrets.jwtSecret)
    console.log(decoded)
    // findById(decoded.id)
}

function edit(user, id) {
    return db('users').where({ id }).update(user)
}

function destroy(id) {
    return db('users').where({ id }).delete();
}