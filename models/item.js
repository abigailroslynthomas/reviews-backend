module.exports = (sequelize, DataTypes) => {
  if (!sequelize) {
    throw new Error("Sequelize instance is undefined in models/item.js");
  }

  const Item = sequelize.define("Item", {
    itemid: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Item.associate = models => {
    Item.hasMany(models.Review, 
      { foreignKey: "itemid", onDelete: "CASCADE" });
  };

  return Item;
};
