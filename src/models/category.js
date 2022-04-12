const Category = (sequelize, DataTypes) => sequelize.define('Category', {
    name: DataTypes.STRING,
}, {
    timestamps: false,
});

module.exports = Category;