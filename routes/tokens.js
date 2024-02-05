const express = require('express');
const app = express.Router();
const sendauthorizedResponse = require("../authorization/authorization");
const token = require("../models/token");
const genRandomToken = require("random-token").create("abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXZY0123456789-_");

app.get("/getNewToken", async (request, response) => {

    const authorized = await sendauthorizedResponse(response, request.header("authorization"));
    if(!authorized){
        return;
    }

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

app.delete("/:token", async (request, response) => {

    const authorized = await sendauthorizedResponse(response, request.header("authorization"));
    if(!authorized){
        return;
    }

    try {
        response.status(200).send( await token.deleteOne({token: request.params.token}));
    } catch (err) {
        response.status(500).send({
            error: err.message
        });
    }

});

module.exports = app;
