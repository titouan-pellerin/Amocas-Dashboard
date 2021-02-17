const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    UserID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    LastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    EmailAddress: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
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
    ]
  });
};
