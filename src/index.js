const express = require("express");

const mongoose = require("mongoose");


const User = require("./models/user.model");

const userController = require("./controllers/user.controller");

const Gallery = require("./models/gallery.model");

const galleryController = require("./controllers/gallery.controller");



const connect = require("./configs/db")

const app = express();

app.use(express.json());



app.use("/users", userController);

app.use("/user", galleryController);




app.listen(3488, async function(){

    await connect();
    console.log("POrt 3488");
});
