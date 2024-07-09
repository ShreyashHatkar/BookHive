const express = require('express')
const APIRoute = express.Router()

const Book = require('../models/bookSchema')

// GET - Route to get all Books from Database
APIRoute.get('/', async (req, res) => {
    try {
        const allBooks = await Book.find()
        res.status(200).json(allBooks)
    } catch (error) {
        res.status(500).send({ ErrorMessage: error.message })
    }
})

// GET - Route to get a specific Book
APIRoute.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.status(200).json(book)
    } catch (error) {
        res.status(404).send({ message: 'Could not find Book', ErrorMessage: error.message })
    }
})

// POST - Route to add a new Book to the Database
APIRoute.post('/', async (req, res) => {
    try {
        const newBook = await Book.create(req.body)
        res.status(201).json(newBook)
    } catch (error) {
        res.status(500).send({ ErrorMessage: error.message })
    }
})

// PATCH - Edit Data for an existing Book
APIRoute.patch('/:id', async (req, res) => {
    try {
        const editedBook = await Book.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(editedBook)
    } catch (error) {
        res.status(500).send({ ErrorMessage: error.message })
    }
})

// DELETE - Delete a Book
APIRoute.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndRemove(req.params.id)
        res.status(200).json(deletedBook)
    } catch (error) {
        res.status(500).send({ ErrorMessage: error.message })
    }
})

// Function to delete all Documents - gets called every 24h
const deleteAllDocuments = async () => {
    try {
        const deleteAllBooks = await Book.deleteMany({})
        console.log("Deleted all Documents successfully");
    } catch (error) {
        console.error(error)
    }
}

module.exports = deleteAllDocuments
module.exports = APIRoute