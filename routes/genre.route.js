const express = require('express');
const router = express.Router();
const {createGenre, readAllGenre, readGenre, updateGenre, deleteGenre} = require('../controllers/genre.controller');

router.post('/', createGenre);

router.get('/', readAllGenre);

router.get('/:id', readGenre);

router.put('/:id', updateGenre);

router.delete('/:id', deleteGenre);

module.exports = router;