
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER, 
      autoIncrement: true,
      allowNull: false,
      unique:true, 
      primaryKey: true,
    },
    userid: {
      type: DataTypes.INTEGER, 
      allowNull:false, 
      references: {
        model:"Users",
        key: "userid"
      },
      onDelete: "CASCADE",
    },
    itemid: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: "Items",
        key: "itemid"
      },
      onDelete: "CASCADE",
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:1,
        max: 5,
      }
    },
    userreview: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
});

Review.associate = models => {
 Review.belongsTo(models.User, {foreignKey: "userid"});
 Review.belongsTo(models.Item, { foreignKey: "itemid"});
};

return Review;
};