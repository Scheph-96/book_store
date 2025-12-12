const express = require("express");
const router = express.Router();
const {createAuthor, readAllAuthor, readAuthor, updateAuthor, deleteAuthor} = require('../controllers/author.controller');

/**
 * @swagger
 * /book_store_api/v1/author:
 *   post:
 *     summary: Insert author (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of authors
 */
router.post("/", createAuthor);

/**
 * @swagger
 * /book_store_api/v1/author:
 *   get:
 *     summary: Get all authors
 *     tags: [Auhtors]
 *     responses:
 *       200:
 *         description: List of authors
 */
router.get("/", readAllAuthor);

/**
 * @swagger
 * /book_store_api/v1/author/:id:
 *   get:
 *     summary: Get a specific author
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of authors
 */
router.get("/:id", readAuthor);

/**
 * @swagger
 * /book_store_api/v1/author/:id:
 *   put:
 *     summary: Update a specific author (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of authors
 */
router.put("/:id", updateAuthor);

/**
 * @swagger
 * /book_store_api/v1/author/:id:
 *   delete:
 *     summary: Delete a specific author (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of authors
 */
router.delete("/:id", deleteAuthor);


module.exports = router;