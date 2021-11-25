/*module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER(11),
        },
        userId: {
            type: dataTypes.INTEGER(11)
        },
        quantity: {
            type: dataTypes.INTEGER(11)
        }
    }

    let config = {
        tableName: "cart",
        timestamps: false
    }

    const Cart = sequelize.define(alias, cols, config)

    Cart.associate = function(models) {
        Cart.hasMany(models.Product, {
            as: "products",
            foreignKey: "productId"
        })
        
        Cart.hasMany(models.User, {
            as: "users",
            foreignKey: "userId"
        })
    }

    return Cart

}*/