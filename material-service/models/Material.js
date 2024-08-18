'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Material = sequelize.define('Material', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    materialName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        index: true,
    },
});

module.exports = Material;