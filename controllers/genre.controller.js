const formidable = require('formidable');
const { mongooseValidationErrorMessage, formidableFormParser } = require('../tools/util.tool');
const Genre = require('../models/genre.model');

const createGenre = (req, res, next) => {
    const form = new formidable.IncomingForm({ allowEmptyFiles: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }

        let genre = new Genre(formidableFormParser(fields));
        let validationError = genre.validateSync();
        if (validationError) {
            let errorMessage = mongooseValidationErrorMessage(validationError);
            return res.status(422).json({ success: false, message: errorMessage });
        }

        genre.save()
            .then((result) => {
                res.status(200).json({ success: true, message: "Genre created successfully" });
            })
            .catch(next);
    });
}

const readAllGenre = (req, res, next) => {
    Genre.find()
        .then((genres) => {
            if (genres?.length) {
                return res.status(200).json({ success: true, data: genres })
            }

            return res.status(404).json({ success: false, message: 'no genre found' });
        })
        .catch(next);
}

const readGenre = (req, res, next) => {
    Genre.findById(req.params.id)
        .then((genre) => {
            if (genre) {
                res.status(200).json({ success: true, data: genre });
            }

            res.status(404).json({ success: false, message: 'no genre found' });
        }).catch(next);
}

const updateGenre = (req, res, next) => {
    const form = new formidable.IncomingForm({ allowEmptyFiles: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }

        Genre.findByIdAndUpdate(req.params.id, formidableFormParser(fields), { new: true })
            .then((genre) => {
                if (!genre) {
                    return res.status(404).json({ success: true, message: "no gender found" });
                }
                return res.status(200).json({ success: true, data: genre, message: "genre updated successfully" });
            })
            .catch(next);
    });
}

const deleteGenre = (req, res, next) => {
    const form = new formidable.IncomingForm({ allowEmptyFiles: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }

        Genre.findByIdAndDelete(req.params.id)
            .then((genre) => {
                if (!genre) {
                    return res.status(404).json({ success: true, message: "no gender found" });
                }

                return res.status(200).json({ success: true, data: genre, message: "genre deleted successfully" });
            }).catch(next)
    });
}

module.exports = {
    createGenre: createGenre,
    readAllGenre: readAllGenre,
    readGenre: readGenre,
    updateGenre: updateGenre,
    deleteGenre, deleteGenre
}