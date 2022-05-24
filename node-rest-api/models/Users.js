/**
 * Defining Database Schema
 * below example only store email, name, hash and salt
 ************** One-way Encryption **************
 * salt: string of characters unique to each user.
 * hash: combining the password provided by the user and the salt
 */
var crypto =  require("crypto");
var jwt = require('jsonwebtoken');
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
// setting the password method called setPassword and combine salt and hash encryption
userSchema.methods.setPassword = function(password){
this.salt = crypto.randomBytes(16).toString('hex');
this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
// validating password with already salt value and decrypt them to match with encrypted value 
userSchema.methods.validPasword = function(password) {
var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
return this.hash === hash;
};
//Generating A JSON web Token (JWT)
userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET");
};

module.exports = mongoose.model('User', userSchema)