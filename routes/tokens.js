const express = require('express');
const app = express.Router();
const sendauthorizedResponse = require("../authorization/authorization");
const token = require("../models/token");
const genRandomToken = require("random-token").create("abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXZY0123456789-_");

app.get("/getNewToken", async (request, response) => {

    //Create a new Token
    //It seems unnecessary, but as of now we have no way of creating a new token other than adding one in the DB directly
    //Until I'll implement an OAuth authorization endpoint, we'll just create a new bearer token the first time this server runs on a machine
    //and that will be used to create other tokens 
    
    //TODO: OAuth 2.0 authorization

    let randomToken = genRandomToken(32);
    try {

        response.status(200).send(await new token({
            token: randomToken,
            creationDate: new Date(),
            expirationDate: new Date()
        }).save());        
    } catch (err) {
        response.status(400).send({error: err.message});
    }
});

app.get("/:id", async (request, response) => {

    //Get info about a token 

    try {
        response.status(200).send( await token.findOne({_id: request.params.id}));
    } catch (err) {
        response.status(400).send({
            error: err.message
        });
    }

});

app.delete("/:id", async (request, response) => {

    //Invalidate a specific Token
    try {
        response.status(200).send( await token.deleteOne({_id: request.params.id}));
    } catch (err) {
        response.status(500).send({
            error: err.message
        });
    }

});

module.exports = app;
