const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addresses', {
    AddressID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    AddressFirstLine: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    AddressSecondLine: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    City: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    PostalCode: {
      type: DataTypes.STRING(5),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'addresses',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AddressID" },
        ]
      },
    ]
  });
};
