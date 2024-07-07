const express = require('express');
const { body, param } = require('express-validator');
const {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
} = require('../controllers/transactionController');

const router = express.Router();

const transactionValidationRules = [
    body('vendorId')
        .isUUID()
        .withMessage('Vendor ID must be a valid UUID')
        .notEmpty()
        .withMessage('Vendor ID is required'),
    body('customerId')
        .isUUID()
        .withMessage('Customer ID must be a valid UUID')
        .notEmpty()
        .withMessage('Customer ID is required'),
    body('materialId')
        .isUUID()
        .withMessage('Material ID must be a valid UUID')
        .notEmpty()
        .withMessage('Material ID is required'),
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - vendorId
 *         - customerId
 *         - materialId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated UUID of the transaction
 *         vendorId:
 *           type: string
 *           description: The ID of the vendor
 *         customerId:
 *           type: string
 *           description: The ID of the customer
 *         materialId:
 *           type: string
 *           description: The ID of the material
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time of the transaction
 *       example:
 *         id: d5fE_asz
 *         vendorId: d5fE_asz
 *         customerId: d5fE_asz
 *         materialId: d5fE_asz
 *         createdAt: 2023-07-01T00:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing transactions
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: The transaction was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Some server error
 */
router.post('/', transactionValidationRules, createTransaction);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of all transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Some server error
 */
router.get('/', getTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: The transaction description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', [param('id').isUUID().withMessage('Transaction ID must be a valid UUID')], getTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: The transaction was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', [param('id').isUUID().withMessage('Transaction ID must be a valid UUID'), ...transactionValidationRules], updateTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       204:
 *         description: The transaction was deleted
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', [param('id').isUUID().withMessage('Transaction ID must be a valid UUID')], deleteTransaction);

module.exports = router;
