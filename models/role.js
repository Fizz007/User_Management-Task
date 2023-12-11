const { DataTypes } = require("sequelize");

require('../config/connectDB')
const Users = require('../models/users')
const Role = sequelize.define("Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
  }, { freezeTableName: true}
);

// Role.hasMany(Users, { foreignKey: 'role' });
console.log("Role models were synchronized successfully.");
module.exports = Role;
