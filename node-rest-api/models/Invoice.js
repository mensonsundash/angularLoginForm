/**
 * Defining Database Schema
 * below example only store username and address (both string)
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Invoice = new Schema(
    {
        name: {type: String},
        reference: {type: String},
        description: {type: String}
    },
    {
        collection: 'invoice'
    }
)

module.exports = mongoose.model('Invoice', Invoice)