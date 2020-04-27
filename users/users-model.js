const db = require('../data/dbConfig')

module.exports = {
    add,
    find,
    findById,
    edit,
    destroy
};

async function add(user) {
    const [id] = await db("users").insert(user, 'id');

    return findById(id)
}

function find() {
    return db('users')
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