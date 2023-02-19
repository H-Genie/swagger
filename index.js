// node.js
const path = require('path');

// express
const express = require('express');
const app = express();
require('dotenv').config();

// swagger
const { swaggerUi, specs } = require("./swagger/swagger")

// mongoose
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

const { patientRouter, statRouter, listRouter } = require('./routes');

const server = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        // await mongoose.set("debug", true);
        console.log('MongoDB connected');

        // middleware
        app.all('/*', (_, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            next();
        });
        app.use(express.static("client/build"));
        app.use(express.json());
        app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))

        // router
        app.get("/", (_, res) => {
            res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
        });
        app.use('/patient', patientRouter);
        app.use('/stat', statRouter);
        app.use('/list', listRouter);

        // port
        app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

    } catch (err) {
        console.log(err);
    }
}

server();