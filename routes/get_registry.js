/*
const knot_list = [
    'Plates',
    'Cups',
    'Rubber Spatulas',
    'Queen Size Bedding',
    'Dish Towels',
    'Dish Cloths',
    'Vacuum',
    'Mop',
    'Stand Mixer',
    'Potholders',
    'Pizza Stone'
  ]
const amazon_list = [

  ]
 */

// Have the ability to store multiple lists to display on screen

const express = require('express');
const router = express.Router();
const db = require('../db/database');

function getItemsForRegistry(registryId) {
    return db.prepare(`
        SELECT registry.id
        FROM registry
        JOIN registry_items item ON registry.id = item.value
        WHERE registry_id = ?
        ORDER BY id
    `)
}

function getRegistryById(registryId) {
    const registry = db.prepare(`
        SELECT id, name
        FROM locations
        WHERE id = ?
    `).get(registryId);

    if (!registry) {
        return null;
    }
    registry.items = getItemsForRegistry(registryId)
    return registry;
}

