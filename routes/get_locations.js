/*
    const locations = [
    {
      id: 1,
      title: 'Ceremony',
      name: 'Zion Evangelical Lutheran Church',
      address: '1610 Main Street, Crete, IL 60417',
      time: '3:00PM - TBD',
      image: '<iframe src="https://www.google.com/maps/embed?pb=!4v1772766381997!6m8!1m7!1sSs1jjHzM9DmPQ1Mfzw4Wnw!2m2!1d41.43586154411035!2d-87.63097924515138!3f322.39150595166524!4f14.793582422710472!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      description: 'Dress: Black Tie / Formal'
    },
    {
      id: 2,
      title: 'Reception',
      name: 'Villa Cesare Banquets & Events',
      address: '900 Eagle Ridge Dr, Schererville, IN 46375',
      time: '6:00PM - TBD',
      image: '<iframe src="https://www.google.com/maps/embed?pb=!4v1772766212595!6m8!1m7!1sgoylmUPa6dqHTZB-JXQ6jg!2m2!1d41.50534737064918!2d-87.47435834659535!3f252.05691048207015!4f-6.318704914042613!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      description: 'Dress: Black Tie / Formal'
    },
  ]
*/

const express = require('express');
const router = express.Router();
const db = require('../db/database');

function getLocationById(locationId) {
    const location = db.prepare(`
        SELECT id, title, name, address, time, image, description
        FROM locations
        WHERE id = ?
    `).get(locationId);

    if (!location) {
        return null;
    }
    return location;
}

// GET all locations
router.get('/', (req, res) => {
    try {
        const locations = db.prepare(`
            SELECT id, title, name, address, time, image, description
            FROM locations
            ORDER BY id
`       ).all();
        res.json(locations);
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch locations'});
    }
});

// Get one location by id
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: 'Invalid location id'});
    }
    try {
        const location = getLocationById(id);
        if (!location) {
            return res.status(404).json({error: 'Location not found'});
        }
        res.json(location);
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch the location'});
    }
});

// POST create a new location (with optional features)
router.post('/', (req, res) => {
    const { title, name, address, time, image, description } = req.body;

    if (!name || !address || !title) {
        return res.status(400).json({ error: 'Title, Name, and address are required' });
    }

    try {
        // Insert the location
        const result = db.prepare(`
            INSERT INTO locations (title, name, address, time, image, description)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(title, name, address, time || null, image || null, description || null);

        const locationId = result.lastInsertRowid;

        // Return the created location with features
        const newLocation = {
            id: locationId,
            title: title,
            name,
            address,
            time: time || null,
            image: image || null,
            description: description || null
        };

        res.status(201).json(newLocation);

    } catch (error) {
        res.status(500).json({ error: 'Failed to create location: ' + error});
    }
});

router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({error: 'Invalid location id'});
    }

    const allowed = ['time', 'description'];

    const updates = Object.keys(req.body)
        .filter(key => allowed.includes(key));
    if (updates.length === 0) {
        return res.status(400).json({error: 'Only time and description can be updated'});
    }

    const setClause = updates.map(key => `${key} = ?`).join(', ');
    const values = updates.map(key => req.body[key]);

    try {
        const result = db.prepare(`
            UPDATE locations
            SET ${setClause}
            WHERE id = ?
        `).run(...values, id);

        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update location' });
    }
})

module.exports = router;