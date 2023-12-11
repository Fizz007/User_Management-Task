const { DataTypes } = require("sequelize");
const queryInterface = sequelize.getQueryInterface();

const States = require('../models/states')
require('../config/connectDB')
const District = sequelize.define("District", {
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
  stateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAtMobile: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAtMobile: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, { 
  freezeTableName: true,
  tableName:"district"
});

queryInterface.addColumn('District', 'districtOrderNo', { type: DataTypes.INTEGER });

District.belongsTo(States, { foreignKey: 'stateId' });
States.hasOne(District, { foreignKey: 'stateId' });
console.log("Districts models were synchronized successfully.");
module.exports = District;
