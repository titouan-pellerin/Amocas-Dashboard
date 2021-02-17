const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessions', {
    SessionID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DateStart: {
      type: DataTypes.DATE,
      allowNull: false
    },
    DateEnd: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ActivityID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'activities',
        key: 'ActivityID'
      }
    }
  }, {
    sequelize,
    tableName: 'sessions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SessionID" },
        ]
      },
      {
        name: "Sessions_Activities_FK",
        using: "BTREE",
        fields: [
          { name: "ActivityID" },
        ]
      },
    ]
  });
};
