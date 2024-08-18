'use strict';

const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Material = require('../models/Material');
const { validationResult } = require('express-validator');

const createTransaction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: [
                { model: User, as: 'vendor', attributes: ['username'] },
                { model: User, as: 'customer', attributes: ['username'] },
                { model: Material, attributes: ['materialName'] },
            ],
        });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id, {
            include: [
                { model: User, as: 'vendor', attributes: ['username'] },
                { model: User, as: 'customer', attributes: ['username'] },
                { model: Material, attributes: ['materialName'] },
            ],
        });
        if (transaction) {
            res.status(200).json(transaction);
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTransaction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (transaction) {
            await transaction.update(req.body);
            res.status(200).json(transaction);
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (transaction) {
            await transaction.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
};
