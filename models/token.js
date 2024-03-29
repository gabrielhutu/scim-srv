const mongodb = require("mongoose");

const tokenSchema = new mongodb.Schema({
    token: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    }
}, {
    collection: "tokens"
});

module.exports = mongodb.model("token", tokenSchema);