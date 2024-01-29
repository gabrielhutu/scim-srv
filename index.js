const bodyParser = require('body-parser');
const express = require('express');
const mongodb = require('mongoose');

const port = 3000;
const app = express();
const dbServerIp = "localhost"

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

//Since this will act as an API and SCIM endpoint, we'll set up the middleware to parse JSON
//The router to the SCIM endpoint
app.use(express.json());
app.use("/scim/v2", require('./routes/scim_endpoint'));

app.get("/Ping", (req, rep) => {
    rep.send({
        "Resp": "Pong"
    })
});


//Start the Listener
app.listen(port, () => {
    console.log("running on port: " + port)
}); 
