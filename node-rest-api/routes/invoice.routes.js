/**
 * Define Our REST API routes using Express js calls
 * allow us to store, update, find and delete user data from the database
 */

const express = require('express');
const app = express();

const invoiceRoute = express.Router();
let Invoice = require('../models/Invoice');

//Add Invoice
invoiceRoute.route('/add-invoice').post((req,res,next) => {
    Invoice.create(req.body, (error, data) =>{
        if(error) {
            return next(error)
        }else{
            res.json(data)
        }
    })
});

//Get all Invoice
invoiceRoute.route('/').get((req, res) => {
    Invoice.find((error, data) => {
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

//Get Invoice
invoiceRoute.route('/read-invoice/:id').get((req,res) => {
    Invoice.findById(req.params.id, (error, data) => {
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

//Updata Invoice
invoiceRoute.route('/update-invoice/:id').put((req, res, next) => {
    Invoice.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error){
            return next(error);
            console.log(error);
        }else {
            res.json(data)
            console.log('Invoice Updated Successfully!')
        }
    })
})

//Delete Invoice

invoiceRoute.route('/delete-invoice/:id').delete((req, res, next) => {
    Invoice.findByIdAndRemove(req.params.id, (error,data) => {
        if(error) {
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = invoiceRoute;