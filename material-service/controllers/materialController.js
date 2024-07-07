'use strict';

const Material = require('../models/Material');

const { validationResult } = require('express-validator');

const createMaterial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const material = await Material.create(req.body);
        res.status(201).json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMaterials = async (req, res) => {
    try {
        const materials = await Material.findAll();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMaterialById = async (req, res) => {
    try {
        const material = await Material.findByPk(req.params.id);
        if (material) {
            res.status(200).json(material);
        } else {
            res.status(404).json({ error: 'Material not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMaterial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const [updated] = await Material.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedMaterial = await Material.findByPk(req.params.id);
            res.status(200).json(updatedMaterial);
        } else {
            res.status(404).json({ error: 'Material not found' });
        }
    } catch (error) {
        res.status500.json({ error: error.message });
    }
};

const deleteMaterial = async (req, res) => {
    try {
        const deleted = await Material.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(200).json({ message: 'Material deleted' });
        } else {
            res.status(404).json({ error: 'Material not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createMaterial,
    getMaterials,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
};