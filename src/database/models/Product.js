module.exports = (sequelize, dataTypes) => {
    let alias = "User";
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
        subCategoryId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
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
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {
        Product.belongsTo(models.Subcategory, {
            as: "subcategory",
            foreignKey: "subcategoryId"
        })
        Product.hasMany(models.ProductImage, {
            as: "images",
            foreignKey: "productId"
        })
    }

    return Product

}