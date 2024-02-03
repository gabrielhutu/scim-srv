const express = require('express');
const app = express.Router();
//User schema
const user = require("../models/User");
//The authorization module
const sendUnauthorizedResponse = require("../authorization/authorization");


//GET all Users a.k.a Okta Import
app.get("/Users",async (request, response) => {

//Check if the authorization token provided is correct, if not bye bye :)
    await sendUnauthorizedResponse(response, request.header("authorization"));

    //Read all users from the DB and send the output as a response
    try{
        response.status(200).send(
            await user.find()
        )
    } catch(err)
    {
        response.status(500).json({
            "error": err.message
        })
    }
});
//Get One User 
app.get("/Users/:id", async (request, response) => {
    await sendUnauthorizedResponse(response, request.header("authorization"));

    try {
        
        response.status(200).send(await user.find({_id: request.params.id}));

    } catch (err) {
        response.status(400).send({
            "error": err.message
        });
    }
});
//Create User a.k.a Assign Okta User to the App
app.post("/Users", async (request, response) => {

    if(request.header("content-type") != "Application/json"){
        response.status(400).send({
            "error": "Only JSON data is allowed, make sure that the Content-type header is set to Application/json!"
        });
        return;
    }

    await sendUnauthorizedResponse(response, request.header("authorization"));


    try{
            //Try to create a new user based on the imported model and save it in the database
        response.status(201).send( new user(request.body).save());
    }catch(err){
        //Or just throw a 400 :)
        response.status(400).send({
            "error": err.message
        })
    }
});
//TODO: Update One User
app.patch("/Users/:id", (request, response) => {
    
});

//Delete One User
app.delete("/Users/:id", async (request, response) => {
    
    await sendUnauthorizedResponse(response, request.header("authorization"));

    try {
         response.status(200).send( await user.deleteOne({_id: request.params.id}));
    } catch (err) {
        response.status(500).send({
            "error": err.message
        })
    }
});

module.exports = app;