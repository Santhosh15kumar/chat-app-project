require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const io = require("socket.io");
const http = require("http");
const ObjectId = require('mongodb').ObjectId
const useRoute = require('./routes/index.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}));

const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(process.env.MONGODB_URL, options);

mongoose.connection.on('connected', () => {
    console.log("Mongoose connection is connected to the database");
});

mongoose.connection.on('error', (error) => {
    console.log("Mongoose connection has occured " + error + ' error');
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose connection is disconnected due to application termination");
});

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Mongoose connection is disconnected due to application termination");
    });
});

app.use(useRoute);
