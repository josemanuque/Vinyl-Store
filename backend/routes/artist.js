const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');

// Create a new artist
router.post('/', async (req, res) => {
    try {
        const artist = new Artist(req.body);
        await artist.save();
        res.status(201).send(artist);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all artists
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).send(artists);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get an artist by ID
router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).send();
        }
        res.status(200).send(artist);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an artist by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).send();
        }

        updates.forEach(update => artist[update] = req.body[update]);
        await artist.save();
        res.status(200).send(artist);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an artist by ID
router.delete('/:id', async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) {
            return res.status(404).send();
        }
        res.status(200).send(artist);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;