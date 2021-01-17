const tableNames = {
  users: "users",
};

exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("username", 30).notNullable();
    table.string("full_name", 100).notNullable();
    table.string("password", 100);
    table.string("email", 320).unique().notNullable();
    table.string("avatar_url", 2083);
    table.timestamps(false, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists(tableNames.users);
};
