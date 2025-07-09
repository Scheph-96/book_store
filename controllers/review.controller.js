const formidable = require('formidable');
const { formidableFormParser, mongooseValidationErrorMessage } = require('../tools/util.tool');
const Review = require('../models/review.model');

const createReview = (req, res, next) => {
    const form = new formidable.IncomingForm({allowEmptyFiles: true});
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }

        let review = new Review(formidableFormParser(fields));

        let validationError = review.validateSync();
        if (validationError) {
            let errorMessage = mongooseValidationErrorMessage(validationError);
            return res.status(422).json({success: false, message: errorMessage});
        }

        review.save()
            .then((result) => {
                res.status(200).json({success: true, mmessage: "Review posted successfully"});
            })
            .catch(next);
    });
}

const readAllReview = (req, res, next) => {
    Review.find().populate('user')
    .then((reviews) => {
        if (reviews?.length) {
            return res.status(200).json({success: true, data: reviews});
        }

        return res.stauts(404).json({success: false,message: "no review found"});
    })
    .catch(next);
}

const readReview = (req, res, next) => {
    Review.findById(req.params.id).populate('user')
    .then((review) => {
        if (review) {
            return res.status(200).json({success: true, data: review});
        }

        return res.status(404).json({success: false, message: "no review found"});
    })
    .catch(next);
}

const updateReview = (req, res, next) => {
    const form = new formidable.IncomingForm({allowEmptyFiles: true});
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }

        Review.findByIdAndUpdate(req.params.id, formidableFormParser(fields), {new: true})
        .populate('user')
        .then((review) => {
            if (review) {
                return res.stauts(200).json({success: true, data: review, message: "review updated"});
            }

            return res.status(404).json({success: false, message: 'no review found'});
        })
        .catch(next);
    })
}

const deleteReview = (req, res, next) => {
    const form = new formidable.IncomingForm({allowEmptyFiles: true});
    form.parse(req, (err, fields, files) => {
        if(err) {
            next(err);
        }

        Review.findByIdAndDelete(req.params.id)
        .then((review) => {
            if (review) {
                return res.status(200).json({success: true, message: "review deleted successfully"});
            }

            return res.status(404).json({success: false, message: "no review found"});
        })
        .catch(next);
    })
}

module.exports = {
    createReview: createReview,
    readAllReview: readAllReview,
    readReview: readReview,
    updateReview: updateReview,
    deleteReview: deleteReview,
}