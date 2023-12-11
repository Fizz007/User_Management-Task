const { DataTypes } = require("sequelize");

const Village = require("../models/villages");
require("../config/connectDB");
const Household = sequelize.define(
  "Household",
  {
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
    children: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    villageId : {
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
  },
  {
    freezeTableName: true,
    tableName: "household",
  }
);

Household.belongsTo(Village, { foreignKey: "villageId" });
console.log("Form models were synchronized successfully.");
module.exports = Household;
