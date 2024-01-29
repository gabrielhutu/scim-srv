const mongodb = require("mongoose");
const userSchema = new mongodb.Schema({
    firstName: {
        type: String
    }, 
    lastName: {
        type: String
    },
    email: {
        type: String,
//        required: true
    }
});

module.exports = mongodb.model("user", userSchema);