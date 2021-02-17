const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participate_to', {
    ActivityID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'activities',
        key: 'ActivityID'
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
    tableName: 'participate_to',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ActivityID" },
          { name: "UserID" },
        ]
      },
      {
        name: "PARTICIPATE_TO_Adherents0_FK",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
    ]
  });
};
