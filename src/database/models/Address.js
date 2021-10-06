module.exports = (sequelize, dataTypes) => {
    let alias = "Address";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        street: {
            type: dataTypes.STRING(100)
        },
        city: {
            type: dataTypes.STRING(100)
        },
        province: {
            type: dataTypes.STRING(100)
        },
        number: {
            type: dataTypes.INTEGER(11)
        },
        postalCode: {
            type: dataTypes.INTEGER(11)
        },
        userId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }

    let config = {
        tableName: "addresses",
        timestamps: false
    }

    const Address = sequelize.define(alias, cols, config)

    Address.associate = models => {
        Address.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        })
    }

    return Address;

}