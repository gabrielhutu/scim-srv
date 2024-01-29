const express = require('express');
const app = express.Router();
const user = require("../models/User");
//TODO: GET all Users a.k.a Okta Import
app.get("/Users", async (req, rep) => {

    //TODO: From the DB, read all users one by one
    try{
        const users = await user.find();
        rep.send(
            users
        )
    }catch(err)
    {
        rep.status(500).json({
            "error": err.message
        })
    }
    //TODO: Concatenate the Users to a single rep\ JSON body
    //TODO: Send the rep\ body
});
//TODO: Get One User 
app.get("/Users/:user_id", (req, rep) => {
    rep.send({
        "User": req.params.user_id
    })
});
//TODO: Create User a.k.a Assign Okta User to the App
app.post("/Users", async (req, rep) => {
    console.log(req.body);
    const userToCreateInDB = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    try{
        const newDBUser = await userToCreateInDB.save();
        rep.status(201).send(newDBUser);
    }catch(err){
        rep.status(400).send({
            "error": err.message
        })
    }
});
//TODO: Update One User
//------

//TODO: Delete One User
app.delete("/Users/:id", (req, rep) => {

});

module.exports = app;