const express = require('express');
const app = express.Router();
const mongodb = require('mongoose');
//Require the user model (schema) from ../models/Users, we'll create users based on this model
const user = require("../models/User");

//GET all Users a.k.a Okta Import
app.get("/Users", async (request, response) => {

    //Read all users from the DB and send the output as a response
    try{
        response.status(200).send(
            await user.find()
        )
    }catch(err)
    {
        response.status(500).json({
            "error": err.message
        })
    }
});
//TODO: Get One User 
app.get("/Users/:user_id", async (request, response) => {
    try {
        
        response.status(200).send(await mongodb.find({_id: }))

    } catch (err) {
        
    }
});
//TODO: Create User a.k.a Assign Okta User to the App
app.post("/Users", (request, response) => {
    if(request.header("content-type") != "Application/json"){
        response.status(400).send({
            "error": "Only JSON data is allowed, make sure that the Content-type header is set to Application/json!"
        });
        return;
    }

    try{
            //Try to create a new user based on the imported model and save it in the database
        response.status(201).send( new user({
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email
            }).save());
    }catch(err){
        //Or just throw a 400 :)
        response.status(400).send({
            "error": err.message
        })
    }
});
//TODO: Update One User
//------

//TODO: Delete One User
app.delete("/Users/:id", (request, response) => {

});

module.exports = app;