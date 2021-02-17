var DataTypes = require("sequelize").DataTypes;
var _activities = require("./activities");
var _addresses = require("./addresses");
var _adherents = require("./adherents");
var _administrator = require("./administrator");
var _has = require("./has");
var _is_registered_for = require("./is_registered_for");
var _participate_to = require("./participate_to");
var _personsincharge = require("./personsincharge");
var _seasons = require("./seasons");
var _sessions = require("./sessions");
var _trainers = require("./trainers");
var _users = require("./users");

function initModels(sequelize) {
  var activities = _activities(sequelize, DataTypes);
  var addresses = _addresses(sequelize, DataTypes);
  var adherents = _adherents(sequelize, DataTypes);
  var administrator = _administrator(sequelize, DataTypes);
  var has = _has(sequelize, DataTypes);
  var is_registered_for = _is_registered_for(sequelize, DataTypes);
  var participate_to = _participate_to(sequelize, DataTypes);
  var personsincharge = _personsincharge(sequelize, DataTypes);
  var seasons = _seasons(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var trainers = _trainers(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  personsincharge.belongsToMany(adherents, { through: has, foreignKey: "UserID", otherKey: "UserID_Adherents" });
  adherents.belongsToMany(personsincharge, { through: has, foreignKey: "UserID_Adherents", otherKey: "UserID" });
  seasons.belongsToMany(adherents, { through: is_registered_for, foreignKey: "SeasonID", otherKey: "UserID" });
  adherents.belongsToMany(seasons, { through: is_registered_for, foreignKey: "UserID", otherKey: "SeasonID" });
  activities.belongsToMany(adherents, { through: participate_to, foreignKey: "ActivityID", otherKey: "UserID" });
  adherents.belongsToMany(activities, { through: participate_to, foreignKey: "UserID", otherKey: "ActivityID" });
  activities.belongsTo(trainers, { as: "User", foreignKey: "UserID"});
  trainers.hasMany(activities, { as: "activities", foreignKey: "UserID"});
  adherents.belongsTo(users, { as: "User", foreignKey: "UserID"});
  users.hasOne(adherents, { as: "adherent", foreignKey: "UserID"});
  adherents.belongsTo(addresses, { as: "Address", foreignKey: "AddressID"});
  addresses.hasMany(adherents, { as: "adherents", foreignKey: "AddressID"});
  administrator.belongsTo(users, { as: "User", foreignKey: "UserID"});
  users.hasOne(administrator, { as: "administrator", foreignKey: "UserID"});
  has.belongsTo(personsincharge, { as: "User", foreignKey: "UserID"});
  personsincharge.hasMany(has, { as: "has", foreignKey: "UserID"});
  has.belongsTo(adherents, { as: "UserID_Adherents_adherent", foreignKey: "UserID_Adherents"});
  adherents.hasMany(has, { as: "has", foreignKey: "UserID_Adherents"});
  is_registered_for.belongsTo(seasons, { as: "Season", foreignKey: "SeasonID"});
  seasons.hasMany(is_registered_for, { as: "is_registered_fors", foreignKey: "SeasonID"});
  is_registered_for.belongsTo(adherents, { as: "User", foreignKey: "UserID"});
  adherents.hasMany(is_registered_for, { as: "is_registered_fors", foreignKey: "UserID"});
  participate_to.belongsTo(activities, { as: "Activity", foreignKey: "ActivityID"});
  activities.hasMany(participate_to, { as: "participate_tos", foreignKey: "ActivityID"});
  participate_to.belongsTo(adherents, { as: "User", foreignKey: "UserID"});
  adherents.hasMany(participate_to, { as: "participate_tos", foreignKey: "UserID"});
  personsincharge.belongsTo(users, { as: "User", foreignKey: "UserID"});
  users.hasOne(personsincharge, { as: "personsincharge", foreignKey: "UserID"});
  sessions.belongsTo(activities, { as: "Activity", foreignKey: "ActivityID"});
  activities.hasMany(sessions, { as: "sessions", foreignKey: "ActivityID"});
  trainers.belongsTo(users, { as: "User", foreignKey: "UserID"});
  users.hasOne(trainers, { as: "trainer", foreignKey: "UserID"});

  return {
    activities,
    addresses,
    adherents,
    administrator,
    has,
    is_registered_for,
    participate_to,
    personsincharge,
    seasons,
    sessions,
    trainers,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
