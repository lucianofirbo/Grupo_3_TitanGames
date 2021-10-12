module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImage";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        image: {
            type: dataTypes.STRING()
        }
    }

    let config = {
        tableName: "products_images",
        timestamps: false
    }

    const ProductImage = sequelize.define(alias, cols, config)

    ProductImage.associate = function(models) {
        ProductImage.belongsTo(models.Product, {
            as: "productImage",
            foreignKey: "productId"
        })
    }

    return ProductImage
}