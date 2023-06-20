const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = 5000;
app.use(cors());

const uri = process.env.ATLAS_URI;

async function connect() {
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDb")
    }
    catch(error){
        console.error(error);
    }
}
connect();

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

