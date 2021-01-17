require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      user: process.env.PG_USER,
      password: process.env.PG_PW,
      database: process.env.PG_DB,
    },
  },
  test: {
    client: "pg",
    connection: {
      user: process.env.PG_USER_TEST,
      password: process.env.PG_PW_TEST,
      database: process.env.PG_DB_TEST,
    },
  },
};
