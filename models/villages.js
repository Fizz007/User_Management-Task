const {DataTypes } = require("sequelize");

const District = require('../models/districts')
require('../config/connectDB')
const Villages = sequelize.define("Villages", {
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
  districtId: {
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
}, { freezeTableName: true,
  tableName:"village",
  paranoid: true,
  deletedAt: 'destroyTime'
});


Villages.belongsTo(District, { foreignKey: 'districtId' });
District.hasOne(Villages, { foreignKey: 'districtId' });
console.log("Villages models were synchronized successfully.");
module.exports = Villages;
