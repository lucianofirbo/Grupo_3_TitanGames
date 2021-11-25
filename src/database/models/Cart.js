module.exports = (sequelize, dataTypes) => {

    let alias = "Cart";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        }
    }

    let config = {
        tableName: "cart",
        timestamps: false
    }

    const Cart = sequelize.define(alias, cols, config)

    Cart.associate = function(models) {
        Cart.belongsTo(models.Product, {
            as: "products",
            foreignKey: "productId"
        })
        Cart.belongsTo(models.User, {
            as: "users",
            foreignKey: "userId"
        })
    }

    return Cart

}
