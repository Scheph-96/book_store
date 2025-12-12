const express = require('express');
const router = express.Router();
const {createGenre, readAllGenre, readGenre, updateGenre, deleteGenre} = require('../controllers/genre.controller');

/**
 * @swagger
 * /book_store_api/v1/genre:
 *   post:
 *     summary: Insert genre (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of genres
 */
router.post('/', createGenre);

/**
 * @swagger
 * /book_store_api/v1/genre:
 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of genres
 */
router.get('/', readAllGenre);

/**
 * @swagger
 * /book_store_api/v1/genre/:id:
 *   get:
 *     summary: Get a specific genre
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of genres
 */
router.get('/:id', readGenre);

/**
 * @swagger
 * /book_store_api/v1/genre/:id:
 *   put:
 *     summary: Update a specific genre (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of genres
 */
router.put('/:id', updateGenre);

/**
 * @swagger
 * /book_store_api/v1/genre/:id:
 *   delete:
 *     summary: Delete a specific genre (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of genres
 */
router.delete('/:id', deleteGenre);

module.exports = router;