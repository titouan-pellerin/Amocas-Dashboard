const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('has', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personsincharge',
        key: 'UserID'
      }
    },
    UserID_Adherents: {
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
    tableName: 'has',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserID" },
          { name: "UserID_Adherents" },
        ]
      },
      {
        name: "HAS_Adherents0_FK",
        using: "BTREE",
        fields: [
          { name: "UserID_Adherents" },
        ]
      },
    ]
  });
};
