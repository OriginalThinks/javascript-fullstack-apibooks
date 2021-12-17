const { Router } = require('express');
const Book = require('../models/Book');
const router = Router();
const { unlink } = require('fs-extra');
const path = require('path');

const Books = require('../models/Book');

router.get('/', async(req, res) => {
    const books = await Books.find();
    res.json(books);
});

router.post('/', async(req, res) => {
    const { title, author, isbn } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({title, author, isbn, imagePath});
    await newBook.save();
    res.json({message: 'Book Saved'});
}); 

router.delete('/:id', async(req, res) => {
    const book = await Books.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public' + book.imagePath))
    res.json({message: 'Book deleted'});

});
    

module.exports = router;