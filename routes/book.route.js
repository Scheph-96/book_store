const express = require('express');
const router = express.Router();
const {createBook, readAllBook, readBook, updateBook, deleteBook} = require('../controllers/book.controller');

/**
 * @swagger
 * /book_store_api/v1/book:
 *   post:
 *     summary: Insert book (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.post("/", createBook);

/**
 * @swagger
 * /book_store_api/v1/book:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/", readAllBook);

/**
 * @swagger
 * /book_store_api/v1/book/:id:
 *   get:
 *     summary: Get a specific book
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/:id", readBook);

/**
 * @swagger
 * /book_store_api/v1/book/:id:
 *   put:
 *     summary: Update a specific book (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.put("/:id", updateBook);

/**
 * @swagger
 * /book_store_api/v1/book/:id:
 *   delete:
 *     summary: Delete a specific book (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.delete("/:id", deleteBook);

module.exports = router;