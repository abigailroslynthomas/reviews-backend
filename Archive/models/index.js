const { sequelize } = require("../config/databse");
const User = require("./user")(sequelize, require("sequelize").DataTypes);
const Item = require("./item")(sequelize, require("sequelize").DataTypes);
const Review = require("./review")(sequelize, require("sequelize").DataTypes);

User.associate({ Review });
Item.associate({Review});
Review.associate({User, Item});

module.exports = { sequelize, User, Item, Review };
