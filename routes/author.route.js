const express = require("express");
const router = express.Router();
const {createAuthor, readAllAuthor, readAuthor, updateAuthor, deleteAuthor} = require('../controllers/author.controller');

router.post("/", createAuthor);

router.get("/", readAllAuthor);

router.get("/:id", readAuthor);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);


module.exports = router;