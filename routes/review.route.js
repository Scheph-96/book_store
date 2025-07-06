const express = require('express');
const router = express.Router();
const {createReview, readAllReview, readReview, updateReview, deleteReview} = require('../controllers/review.controller');

router.post('/', createReview);

router.get('/', readAllReview);

router.get('/:id', readReview);

router.put('/:id', updateReview);

router.delete('/:id', deleteReview);

module.exports= router;