const { Sequelize, DataTypes } = require('sequelize');

// Skapar en lokal databasfil som heter 'database.sqlite'
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// Definierar produkten enligt specifikationen
const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DOUBLE, allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
  rating: { type: DataTypes.DOUBLE, defaultValue: 4.5 }
});

// Synka med databasen (skapar tabellen om den inte finns)
sequelize.sync();

module.exports = Product;