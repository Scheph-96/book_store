const express = require('express');
const router = express.Router();
const {createReview, readAllReview, readReview, updateReview, deleteReview} = require('../controllers/review.controller');

/**
 * @swagger
 * /book_store_api/v1/review:
 *   post:
 *     summary: Insert review (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.post('/', createReview);

/**
 * @swagger
 * /book_store_api/v1/review:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/', readAllReview);

/**
 * @swagger
 * /book_store_api/v1/review/:id:
 *   get:
 *     summary: Get a specific review
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/:id', readReview);

/**
 * @swagger
 * /book_store_api/v1/review/:id:
 *   put:
 *     summary: Update a specific review (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.put('/:id', updateReview);

/**
 * @swagger
 * /book_store_api/v1/review/:id:
 *   delete:
 *     summary: Delete a specific review (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.delete('/:id', deleteReview);

module.exports= router;