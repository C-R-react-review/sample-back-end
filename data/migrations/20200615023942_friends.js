
exports.up = function(knex) {
  return knex.schema.createTable('friends', friends => {
        friends.increments();

        friends.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')

        friends.integer('friend_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')

        friends.boolean('accepted')
            .notNullable()
            .defaultTo(false)
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('friends');
};
