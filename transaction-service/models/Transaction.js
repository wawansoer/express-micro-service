const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Material = require('./Material');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    vendorId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    customerId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    materialId: {
        type: DataTypes.UUID,
        references: {
            model: Material,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    timestamps: true,
});

Transaction.belongsTo(User, { as: 'vendor', foreignKey: 'vendorId' });
Transaction.belongsTo(User, { as: 'customer', foreignKey: 'customerId' });
Transaction.belongsTo(Material, { foreignKey: 'materialId' });

module.exports = Transaction;
