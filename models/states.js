
const { DataTypes } = require('sequelize');
require('../config/connectDB')
const State = sequelize.define('state', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name:{
      type: DataTypes.STRING, 
      allowNull: false,
  }
}, { 
  freezeTableName: true,
  tableName:"state"
})

module.exports = State

