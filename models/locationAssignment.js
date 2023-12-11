const { DataTypes } = require("sequelize");
const Role = require("../models/role");
const Users = require("../models/users");
require("../config/connectDB");
const LocationAssignment = sequelize.define(
  "LocationAssignment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('0', '1', '2', '3'),
      allowNull: false,
      comment: '0:Admin, 1:State, 2:District, 3:village'
    },
    password: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
    },
    districtId: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    villageId: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  { freezeTableName: true, tableName: "LocationAssignment" }
);

LocationAssignment.hasMany(Role, { foreignKey: 'userId' });
console.log("Role models were synchronized successfully.");
module.exports = LocationAssignment;
