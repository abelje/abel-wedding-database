/*
{
    id: 1,
    name: "Registry Website"
    link: "www.example.com"
}
 */

// Change it to links, would be easier

const express = require('express');
const router = express.Router();
const db = require('../db/database');

function getRegistryById(registryId) {
    const registry = db.prepare(`
        SELECT id, name, link
        FROM registry
        WHERE id = ?
    `).get(registryId);

    if (!registry) {
        return null;
    }
    return registry;
}

// GET all registry websites
router.get('/', (req, res) => {
    try {
        const registry = db.prepare(`
            SELECT id, name, link
            FROM registry
            ORDER BY id
        `).all()
        res.json(registry);
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch registry websites'})
    }
});

// GET one website by id
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: 'Invalid registry id'});
    }
    try {
        const registry = getRegistryById(id);
        if (!registry) {
            return res.status(404).json({error: 'Registry not found'});
        }
        res.json(registry);
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch the registry'});
    }
});

// POST add a new registry website
router.post('/', (req, res) => {
    const { name, link } = req.body;

    if (!name || !link) {
        return res.status(400).json({ error: 'Name and Link are required' });
    }

    try {
        // Insert the location
        const result = db.prepare(`
            INSERT INTO registry (name, link)
            VALUES (?, ?)
        `).run(name, link);
        const registryId = result.lastInsertRowid;

        // Return the created registry id
        const newRegistry = {
            id: registryId,
            name,
            link
        }
        res.json(newRegistry);
    }
    catch (error) {
        res.status(500).json({error: 'Failed to create the registry'});
    }
});

module.exports = router;