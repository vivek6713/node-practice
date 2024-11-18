const Sequelize = require("sequelize");
const db_config = require("./config");

const sequelize = new Sequelize(
  db_config.development.database,
  db_config.development.username,
  db_config.development.password,
  db_config.development,
  {
    logging: true,
  }
);

module.exports = sequelize;
