const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Material Service API',
            version: '1.0.0',
            description: 'API for managing materials',
        },
        servers: [
            {
                url: process.env.SERVER_URL || 'http://localhost:3002',
            },
        ],
    },
    apis: ['./routes/*.js'], // files containing annotations
};

const specs = swaggerJsDoc(options);

module.exports = {
    swaggerUi,
    specs,
};
