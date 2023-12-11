const {DataTypes } = require("sequelize");

const Role = require('../models/role');
const States = require("../models/states");
const District = require("../models/districts")
const Villages = require("../models/villages")
require('../config/connectDB')
const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
  stateLoc: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  districtLoc: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  villageLoc: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

Users.hasMany(Role, { foreignKey: 'role' });
Users.hasOne(States, { foreignKey: 'stateId' });
Users.hasMany(District, { foreignKey: 'districtId' });
Users.hasMany(Villages, { foreignKey: 'villageId' });
console.log("Users models were synchronized successfully.");
module.exports = Users;
