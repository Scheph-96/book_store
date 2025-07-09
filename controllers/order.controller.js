const formidable = require('formidable');
const { formidableFormParser, mongooseValidationErrorMessage } = require('../tools/util.tool');
const Order = require('../models/order.model');
const Book = require('../models/book.model');

const createOrder = (req, res, next) => {
    const form = new formidable.IncomingForm({ allowEmptyFiles: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
        }

        fields = formidableFormParser(fields);
        let order = new Order(fields);

        let orderBooks = JSON.parse(fields.books);
        
        let orderItems = [];
        let orderAmount = 0;

        for (const { book, quantity } of orderBooks) {
            let bookDoc = await Book.findById(book);

            if (!bookDoc) return next(new Error("Ordered book not found"));

            orderItems.push({
                book: bookDoc,
                quantity: quantity,
                itemTotalPrice: bookDoc.price * quantity
            });
            orderAmount += bookDoc.price * quantity
        }

        order.books = orderItems;
        order.amount = orderAmount;

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

            return res.status(404).json({ success: false, message: "no order found" });
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
                    return res.status(200).json({ success: true, data: order, message: "order updated" });
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

        Order.findByIdAndDelete(req.params.id)
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