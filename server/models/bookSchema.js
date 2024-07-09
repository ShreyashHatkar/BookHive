const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    rating: {
        type: String,
        required: true
    },
    language: {
        type: String
    },
    readStatus: {
        type: Boolean
    },
    format: {
        type: String
    }

})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book