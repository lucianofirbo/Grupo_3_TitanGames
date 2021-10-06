module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        categoryID: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }

    let config = {
        tableName: "subcategories",
        timestamps: false
    }

    const Subcategory = sequelize.define(alias, cols, config)

    Subcategory.associate = models => {
        Subcategory.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categoryId"
        })
        Subcategory.hasMany(models.Product, {
            as: "products",
            foreignKey: "subcategoryId"
        })
    }

    return Subcategory

}