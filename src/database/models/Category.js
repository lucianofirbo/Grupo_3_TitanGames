module.exports = (sequelize, dataTypes) => {
    let alias = "Category";
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
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config)

    /* Category.associate = function(models) {
        Category.hasMany(models.Product, {
            foreignKey: {
                name: "categoryId"
            },
            as: "products"
        })
    } */
    Category.associate = function(models) {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "categoryId"
        })
        Category.hasMany(models.Subcategory, {
            as: "subCategory",
            foreignKey: "subCategoryId"
        })
    }

    return Category

}