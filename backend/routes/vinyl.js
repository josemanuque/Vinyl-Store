const express = require('express');
const router = express.Router();
const Vinyl = require('../models/vinyl');

// Create a new vinyl record
router.post('/', async (req, res) => {
    try {
        const vinyl = new Vinyl(req.body);
        await vinyl.save();
        const populatedVinyl = await Vinyl.findById(vinyl._id).populate('artist');
        res.status(201).send(populatedVinyl);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all vinyl records
router.get('/', async (req, res) => {
    try {
        const vinyls = await Vinyl.find().populate('artist');
        res.status(200).send(vinyls);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a vinyl record by ID
router.get('/:id', async (req, res) => {
    try {
        const vinyl = await Vinyl.findById(req.params.id).populate('artist');
        if (!vinyl) {
            return res.status(404).send();
        }
        res.status(200).send(vinyl);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a vinyl record by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'artist', 'coverImage', 'price'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const vinyl = await Vinyl.findById(req.params.id);
        if (!vinyl) {
            return res.status(404).send();
        }

        updates.forEach(update => vinyl[update] = req.body[update]);
        await vinyl.save();
        res.status(200).send(vinyl);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a vinyl record by ID
router.delete('/:id', async (req, res) => {
    try {
        const vinyl = await Vinyl.findByIdAndDelete(req.params.id);
        if (!vinyl) {
            return res.status(404).send();
        }
        res.status(200).send(vinyl);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;