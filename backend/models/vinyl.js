const mongoose = require('mongoose');

const vinylSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Artist',
        required: true
    },
    coverImage: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: false
    },
});

const Vinyl = mongoose.model('Vinyl', vinylSchema);

module.exports = Vinyl;