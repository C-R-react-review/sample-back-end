
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
  
        users
            .string('username', 128)
            .notNullable()
            .unique();

        users
            .string('email', 128)
            .notNullable()
            .unique();

        users
            .string('password', 128)
            .notNullable()

        users
            .string('first_name', 128)

        users
            .string('last_name', 128)

        users
            .string('about', 500)

        users
            .string('avatar', 128)
  
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
