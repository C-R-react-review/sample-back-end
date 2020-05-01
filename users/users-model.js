const db = require('../data/dbConfig')

module.exports = {
    add,
    find,
    findByUsername,
    findById,
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

async function edit(user, id) {
    const [updated_user] = await db('users').where({ id }).update(user, 'id')
    return findById(updated_user)
}

function destroy(id) {
    return db('users').where({ id }).delete();
}