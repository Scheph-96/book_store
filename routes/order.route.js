const express = require('express');
const router = express.Router();
const {createOrder, readAllOrder, readOrder, updateOrder, deleteOrder} = require('../controllers/order.controller');

/**
 * @swagger
 * /book_store_api/v1/order:
 *   post:
 *     summary: Insert order (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.post('/', createOrder);

/**
 * @swagger
 * /book_store_api/v1/order:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/', readAllOrder);

/**
 * @swagger
 * /book_store_api/v1/order/:id:
 *   get:
 *     summary: Get a specific order
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/:id', readOrder);

/**
 * @swagger
 * /book_store_api/v1/order/:id:
 *   put:
 *     summary: Update a specific order (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.put('/:id', updateOrder);

/**
 * @swagger
 * /book_store_api/v1/order/:id:
 *   delete:
 *     summary: Delete a specific order (no interaction)
 *     x-explorer-enabled: false
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.delete('/:id', deleteOrder);

module.exports = router;