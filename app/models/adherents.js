const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adherents', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'UserID'
      }
    },
    BirthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Gender: {
      type: "ENUM('male','female','unspecified')",
      allowNull: false
    },
    RegistrationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Phone1: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Phone2: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    AddressID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'addresses',
        key: 'AddressID'
      }
    }
  }, {
    sequelize,
    tableName: 'adherents',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "Adherents_Addresses0_FK",
        using: "BTREE",
        fields: [
          { name: "AddressID" },
        ]
      },
    ]
  });
};
