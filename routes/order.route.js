const express = require('express');
const router = express.Router();
const {createOrder, readAllOrder, readOrder, updateOrder, deleteOrder} = require('../controllers/order.controller');

router.post('/', createOrder);

router.get('/', readAllOrder);

router.get('/:id', readOrder);

router.put('/:id', updateOrder);

router.delete('/:id', deleteOrder);

module.exports = router;