const formidable = require('formidable');
const { formidableFormParser, mongooseValidationErrorMessage } = require('../tools/util.tool');
const Order = require('../models/order.model');

const createOrder = (req, res, next) => {
    const form = new formidable.IncomingForm({ allowEmptyFiles: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }

        let order = new Order(formidableFormParser(fields));

        let validationError = order.validateSync();
        if (validationError) {
            let errorMessage = mongooseValidationErrorMessage(validationError);
            return res.status(422).json({ success: false, message: errorMessage });
        }

        order.save()
            .then((result) => {
                res.status(200).json({ success: true, mmessage: "Order created successfully" });
            })
            .catch(next);
    });
}

const readAllOrder = (req, res, next) => {
    Order.find().populate('user').populate('books')
        .then((orders) => {
            if (orders?.length) {
                return res.status(200).json({ success: true, data: orders });
            }

            return res.stauts(404).json({ success: false, message: "no order found" });
        })
        .catch(next);
}

const readOrder = (req, res, next) => {
    Order.findById(req.params.id).populate('user').populate('books')
        .then((order) => {
            if (order) {
                return res.status(200).json({ success: true, data: order });
            }

            return res.status(404).json({ success: false, message: "no order found" });
        })
        .catch(next);
}

const updateOrder = (req, res, next) => {
    const form = new formidable.IncomingForm({ allowEmptyFiles: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }

        Order.findByIdAndUpdate(req.params.id, formidableFormParser(fields), { new: true })
            .populate('user')
            .then((order) => {
                if (order) {
                    return res.stauts(200).json({ success: true, data: order, message: "order updated" });
                }

                return res.status(404).json({ success: false, message: 'no order found' });
            })
            .catch(next);
    })
}

const deleteOrder = (req, res, next) => {
    const form = new formidable.IncomingForm({ allowEmptyFiles: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }

        Order.findByIdAndDelete(req.params.id, formidableFormParser(fields))
            .then((order) => {
                if (order) {
                    return res.status(200).json({ success: true, message: "order deleted successfully" });
                }

                return res.status(404).json({ success: false, message: "no order found" });
            })
            .catch(next);
    })
}

module.exports = {
    createOrder: createOrder,
    readAllOrder: readAllOrder,
    readOrder: readOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
}