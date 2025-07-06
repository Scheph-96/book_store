const express = require('express');
const router = express.Router();
const {createUser, readAllUser, readUser, updateUser, deleteUser} = require('../controllers/user.controller');

module.exports = router;