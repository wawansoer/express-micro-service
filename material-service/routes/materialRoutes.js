'use strict';

const Material = require('../models/Material');
const express = require('express');
const { body } = require('express-validator');
const {
    createMaterial,
    getMaterials,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
} = require('../controllers/materialController');

const router = express.Router();

const materialValidationRules = [
    body('materialName')
        .isString()
        .withMessage('Material name must be a string')
        .notEmpty()
        .withMessage('Material name is required')
        .isLength({ min: 3 })
        .withMessage('Material name must be at least 3 characters long')
        .custom(async (materialName) => {
            const material = await Material.findOne({ where: { materialName } });
            if (material) {
                throw new Error('Material name must be unique');
            }
        }),
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Material:
 *       type: object
 *       required:
 *         - materialName
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated UUID of the material
 *         materialName:
 *           type: string
 *           description: The name of the material
 *       example:
 *         id: d5fE_asz
 *         materialName: Steel
 */

/**
 * @swagger
 * tags:
 *   name: Materials
 *   description: API for managing materials
 */

/**
 * @swagger
 * /materials:
 *   post:
 *     summary: Create a new material
 *     tags: [Materials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Material'
 *     responses:
 *       201:
 *         description: The material was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Some server error
 */
router.post('/', materialValidationRules, createMaterial);

/**
 * @swagger
 * /materials:
 *   get:
 *     summary: Get all materials
 *     tags: [Materials]
 *     responses:
 *       200:
 *         description: List of all materials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Material'
 *       500:
 *         description: Some server error
 */
router.get('/', getMaterials);

/**
 * @swagger
 * /materials/{id}:
 *   get:
 *     summary: Get material by ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The material ID
 *     responses:
 *       200:
 *         description: The material description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 *       404:
 *         description: Material not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', getMaterialById);

/**
 * @swagger
 * /materials/{id}:
 *   put:
 *     summary: Update material by ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The material ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Material'
 *     responses:
 *       200:
 *         description: The material was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Material not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', materialValidationRules, updateMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   delete:
 *     summary: Delete material by ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The material ID
 *     responses:
 *       200:
 *         description: The material was deleted
 *       404:
 *         description: Material not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', deleteMaterial);

module.exports = router;

