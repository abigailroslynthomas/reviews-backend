const { sequelize } = require("../config/database");
const User = require("./user")(sequelize, require("sequelize").DataTypes);
const Item = require("./item")(sequelize, require("sequelize").DataTypes);
const Review = require("./review")(sequelize, require("sequelize").DataTypes);


const models = { User, Item, Review };

User.associate(models);
Item.associate(models);
Review.associate(models);

module.exports = { sequelize, User, Item, Review };