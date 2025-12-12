const express = require('express');
const router = express.Router();
const {createUser, readAllUser, readUser, updateUser, deleteUser} = require('../controllers/user.controller');

/**
 * @swagger
 * /book_store_api/v1/user:
 *   post:
 *     summary: Insert user (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.post('/', createUser);

/**
 * @swagger
 * /book_store_api/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', readAllUser);

/**
 * @swagger
 * /book_store_api/v1/user/:id:
 *   get:
 *     summary: Get a specific user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/:id', readUser);

/**
 * @swagger
 * /book_store_api/v1/user/:id:
 *   put:
 *     summary: Update a specific user (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * /book_store_api/v1/user/:id:
 *   delete:
 *     summary: Delete a specific user (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.delete('/:id', deleteUser);

module.exports = router;