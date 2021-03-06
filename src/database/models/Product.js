module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(800)
        },
        offers: {
            type: dataTypes.INTEGER(11)
        },
        minimumVideo: {
            type: dataTypes.STRING(200)
        },
        minimumProcessor: {
            type: dataTypes.STRING(200)
        },
        minimumRam: {
            type: dataTypes.STRING(200)
        },
        recommendedVideo: {
            type: dataTypes.STRING(200)
        },
        recommendedProcessor: {
            type: dataTypes.STRING(200)
        },
        recommendedRam: {
            type: dataTypes.STRING(200)
        },
        videoURL: {
            type: dataTypes.STRING(100)
        },
        timesVisited: {
            type: dataTypes.INTEGER(11)
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "categoryId"
        })
        Product.hasMany(models.ProductImage, {
            as: "productImage",
            foreignKey: "productId"
        })
        Product.belongsTo(models.Subcategory, {
            as: "subcategory",
            foreignKey: "subCategoryId"
        })
        Product.hasMany(models.Cart, {
            as: "cartProducts",
            foreignKey: "productId"
        })
    }

    return Product

}