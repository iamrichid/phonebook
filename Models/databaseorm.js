const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/phonebook');

async function authenticateDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Define a new model for the "users" table
const User = sequelize.define('phone_user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
});

async function syncUserModel() {
  await User.sync();
  console.log("The table for the Phonebook model was just (re)created!");
}

// Authenticate the database connection
authenticateDatabase();

// Synchronize the User model with the database
syncUserModel();

module.exports = { User };
