module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        image: {
            type: dataTypes.STRING()
        },
        productId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }

    let config = {
        tableName: "products_images",
        timestamps: false
    }

    const ProductImage = sequelize.define(alias, cols, config)

    ProductImage.associate = function(models) {
        ProductImage.belongsTo(models.Product, {
            as: "product",
            foreignKey: "productId"
        })
    }

    return ProductImage
}