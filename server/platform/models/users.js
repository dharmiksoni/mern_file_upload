const { ObjectId } = require('mongodb');
const lodash = require('lodash');
const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    name: String,
    email: String,
    oauth_tokens: {
        google: {
            access_token: String,
            expiry_date: Number,
            refresh_token: String,
            scope: Array,
            token_type: String,
            token_updated_at: Date,
            email: String,
            stored_calendars: Array
        }
    }
}, {
    collection: 'users',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

const UsersModel = mongoose.model('users', Users);

module.exports = UsersModel;
