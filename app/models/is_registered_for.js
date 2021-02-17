const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('is_registered_for', {
    SeasonID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'seasons',
        key: 'SeasonID'
      }
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'adherents',
        key: 'UserID'
      }
    }
  }, {
    sequelize,
    tableName: 'is_registered_for',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SeasonID" },
          { name: "UserID" },
        ]
      },
      {
        name: "IS_REGISTERED_FOR_Adherents0_FK",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
    ]
  });
};
