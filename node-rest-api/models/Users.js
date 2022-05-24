/**
 * Defining Database Schema
 * below example only store email, name, hash and salt
 ************** One-way Encryption **************
 * salt: string of characters unique to each user.
 * hash: combining the password provided by the user and the salt
 */
var crypto =  require("crypto");
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
 
 module.exports = mongoose.model('Users', userSchema)