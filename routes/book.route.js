const express = require('express');
const router = express.Router();
const {createBook, readAllBook, readBook, updateBook, deleteBook} = require('../controllers/book.controller');

router.post("/", createBook);

router.get("/", readAllBook);

router.get("/:id", readBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;