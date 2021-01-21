const tableNames = {
  users: "users",
  posts: "posts",
  likes: "likes",
  followers: "followers",
};

function references(table, name, tableName) {
  table
    .integer(name)
    .unsigned()
    .references("id")
    .inTable(tableName)
    .onDelete("cascade")
    .notNullable();
}

exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.users, (table) => {
    table.increments();
    table.string("username", 30).notNullable();
    table.string("full_name", 200).notNullable();
    table.string("password", 200);
    table.string("email", 320).unique().notNullable();
    table.string("avatar_url", 2083);
    table.string("description", 2000);
    table.timestamps(false, true);
  });

  await knex.schema.createTable(tableNames.posts, (table) => {
    table.increments();
    references(table, "user_id", tableNames.users);
    table.string("image", 2083).notNullable();
    table.string("description", 2000);
    table.timestamps(false, true);
  });

  await knex.schema.createTable(tableNames.likes, (table) => {
    table.increments();
    references(table, "user_id", tableNames.users);
    references(table, "post_id", tableNames.posts);
  });

  await knex.schema.createTable(tableNames.comments, (table) => {
    table.increments();
    references(table, "user_id", tableNames.users);
    references(table, "post_id", tableNames.posts);
    table.string("comment", 2000);
  });

  await knex.schema.createTable(tableNames.followers, (table) => {
    table.increments();
    references(table, "following", tableNames.users);
    references(table, "follower", tableNames.users);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists(tableNames.users);
};
