

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userpassword: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  User.associate = models => {
    User.hasMany(models.Review, { foreignKey: "userid", onDelete: "CASCADE" });
  };

  return User;
};