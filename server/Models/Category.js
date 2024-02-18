const mongoose = require('mongoose');

const CategorySchmea = new mongoose.Schema({
    Category: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Categorie', CategorySchmea);