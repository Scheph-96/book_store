const formidable = require('formidable');
const {formidableFormParser, mongooseValidationErrorMessage} = require('../tools/util.tool');
const User = require('../models/user.model');

const createUser = (req, res, next) => {
    const form = new formidable.IncomingForm({allowEmptyFiles: true});
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }

        let user = new User(formidableFormParser(fields));

        let validationError = user.validateSync();
        if (validationError) {
            let errormessage = mongooseValidationErrorMessage(validationError);
            return res.status(422).json({success: false, message: errormessage});
        }

        user.save()
        .then((result) => {
            res.status(200).json({success: true, message: "User created successfully"});
        }).catch(next);
    });
}

const readAllUser = (req, res, next) => {
    User.find()
    .then((users) => {
        if (users?.length) {
            return res.status(200).json({success: true, data: users});
        }

        return res.status(404).json({success: false, message: "no user found"});
    }).catch(next);
}

const readUser = (req, res, next) => {
    User.findById(req.params.id)
    .then((user) => {
        if (user) {
            return res.status(200).json({success: true, data: user});
        }

        return res.status(404).json({success: false, message: "no user found"});
    }).catch(next);
}

const updateUser = (req, res, next) => {
    const form = formidable.IncomingForm({allowEmptyFiles: true});
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }

        User.findByIdAndUpdate(req.params.id, formidableFormParser(fields), {new: true})
        .then((user) => {
            if (user) {
                return res.status(200).json({success: true, data: user, message: "message updated successfully"});
            }

            return res.status(404).json({success: false, message: "no user found"});


        }).catch(next);
    });
}

const deleteUser = (req, res, next) => {
    const form = new formidable.IncomingForm({allowEmptyFiles: true});
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }

        User.findByIdAndDelete(req.params.id).then((user) => {
            if (user) {
                return res.status(200).json({success: true, message: "user deleted successfully"});
            }

            return res.status(404).json({success: false, message: "no user found"});
        })
    })
}

module.exports = {
    createUser: createUser,
    readAllUser: readAllUser,
    readUser: readUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}