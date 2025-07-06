const formidable = require("formidable");
const { formidableFormParser, mongooseValidationErrorMessage, writeOnDisk } = require("../tools/util.tool.js");
const Book = require("../models/book.model.js");

const createBook = (req, res, next) => {
  const form = new formidable.IncomingForm({ allowEmptyFiles: false });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
    }

    let book = new Book(formidableFormParser(fields));

    writeOnDisk('book_cover', files, 'book', book._id)
      .then((result) => {
        book.cover = `${req.protocol}://${req.get('host')}${result.filepath}`;

        let validationError = book.validateSync();
        if (validationError) {
          let errormessage = mongooseValidationErrorMessage(validationError);
          return res.status(422).json({ success: false, message: errormessage });
        }

        book.save()
          .then((result) => {
            res.status(200).json({ success: true, message: "Book created successfully" });
          }).catch(next);

      }).catch(next);
  });
};

const readAllBook = (req, res, next) => {
  Book.find().populate('author').populate('genre')
    .then((books) => {
      if (books?.length) {
        return res.status(200).json({ success: true, data: books });
      }

      return res
        .status(404)
        .json({ success: false, message: "no author found" });
    })
    .catch(next);
};

const readBook = (req, res, next) => {
  Book.findById(req.params.id).populate('author').populate('genre')
    .then((book) => {
      if (book) {
        return res.status(200).json({ success: true, data: book });
      }

      return res.status(404).json({ success: false, message: "no author found" });
    })
    .catch(next);
};

const updateBook = (req, res, next) => {
  const form = new formidable.IncomingForm({ allowEmptyFiles: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
    }

    Book.findByIdAndUpdate(req.params.id, formidableFormParser(fields), {
      new: true,
    }).populate('author').populate('genre')
      .then((book) => {
        if (!book) {
          return res.status(404).json({ success: true, message: "no book found" });
        }
        return res.status(200).json({ success: true, data: book, message: "book updated successfully" });
      })
      .catch(next);
  });
};

const deleteBook = (req, res, next) => {
  const form = new formidable.IncomingForm({ allowEmptyFiles: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
    }

    Book.findByIdAndDelete(req.params.id, formidableFormParser(fields))
      .then((book) => {
        if (!book) {
          return res.status(404).json({ success: true, message: "no book found" });
        }
        return res.status(200).json({ success: true, data: book, message: "author deleted successfully" });
      })
      .catch(next);
  });
};

module.exports = {
  createBook: createBook,
  readAllBook: readAllBook,
  readBook: readBook,
  updateBook: updateBook,
  deleteBook: deleteBook,
};
