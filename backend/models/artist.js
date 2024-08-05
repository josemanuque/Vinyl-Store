const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;