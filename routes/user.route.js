const express = require('express');
const router = express.Router();
const {createUser, readAllUser, readUser, updateUser, deleteUser} = require('../controllers/user.controller');

router.post('/', createUser);

router.get('/', readAllUser);

router.get('/:id', readUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;