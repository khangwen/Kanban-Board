"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a Task
 */
/* jshint node: true */

import mongoose from 'mongoose';

// create a schema
var userSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    user_name: String,
    password: String,
    first_name: String,
    last_name: String,
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
export default User;
