const formidable = require("formidable");
const {
  formidableFormParser,
  mongooseValidationErrorMessage,
  writeOnDisk,
} = require("../tools/util.tool.js");
const Author = require("../models/author.model.js");

const createAuthor = (req, res, next) => {
  const form = new formidable.IncomingForm({ allowEmptyFiles: false });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
    }

    let author = new Author(formidableFormParser(fields));

    // author photos format author_id.extension
    writeOnDisk('author_photo', files, 'author', author._id)
      .then((result) => {
        author.photo = `${req.protocol}://${req.get('host')}${result.filepath}`;

        let validationError = author.validateSync();
        if (validationError) {
          let errorMessage = mongooseValidationErrorMessage(validationError);
          return res.status(422).json({ success: false, message: errorMessage });
        }

        // return res.status(200).json(author);

        author.save()
          .then((result) => {
            res
              .status(200)
              .json({ success: true, message: "Author created successfully" });
          })
          .catch(next);
        return
      }).catch(next);
  });
};

const readAllAuthor = (req, res, next) => {
  Author.find()
    .then((authors) => {
      if (authors?.length) {
        return res.status(200).json({ success: true, data: authors });
      }

      return res
        .status(404)
        .json({ success: false, message: "no author found" });
    })
    .catch(next);
};

const readAuthor = (req, res, next) => {
  Author.findById(req.params.id)
    .then((author) => {
      if (author) {
        return res.status(200).json({ success: true, data: author });
      }

      return res
        .status(404)
        .json({ success: false, message: "no author found" });
    })
    .catch(next);
};

const updateAuthor = (req, res, next) => {
  const form = new formidable.IncomingForm({ allowEmptyFiles: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
    }

    Author.findByIdAndUpdate(req.params.id, formidableFormParser(fields), {
      new: true,
    })
      .then((author) => {
        if (!author) {
          return res.status(404).json({ success: true, message: "no author found" });
        }
        return res.status(200).json({ success: true, data: author, message: "author updated successfully" });
      })
      .catch(next);
  });
};

const deleteAuthor = (req, res, next) => {
  const form = new formidable.IncomingForm({ allowEmptyFiles: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
    }

    Author.findByIdAndDelete(req.params.id)
      .then((author) => {
        if (!author) {
          return res.status(404).json({ success: true, message: "no author found" });
        }
        return res.status(200).json({ success: true, message: "author deleted successfully" });
      })
      .catch(next);
  });
};

module.exports = {
  createAuthor: createAuthor,
  readAllAuthor: readAllAuthor,
  readAuthor: readAuthor,
  updateAuthor: updateAuthor,
  deleteAuthor: deleteAuthor,
};
