const mongodb = require('mongoose');
const dbServerIp = "localhost";

//Connect to the DB

mongodb.connect("mongodb://" + dbServerIp + "/scim");
const db = mongodb.connection;
db.on("error", (error) => {
    //Throw any db init error
    throw error;
});

db.once("open", () => {
    //Inform the admin that the Server could connect to the database
    console.log("Connected to the db successfully");
});

module.exports = db;