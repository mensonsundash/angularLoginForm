/**
 * Defining Database Schema for users
 * below example only store email, name, hash, salt
 */
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 let userSchema = new Schema(
     {
         email: {type: String, unique: true, required: true},
         name: {type: String, required: true},
         hash: String,
         salt: String
     },
     {
         collection: 'users'
     }
 )
 
 module.exports = mongoose.model("Users", userSchema)