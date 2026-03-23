const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './database.sqlite', logging: false });

const Rating = sequelize.define('Rating', {
  rating: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Tvingar fram tabellen [cite: 129]
sequelize.sync();

module.exports = Rating;