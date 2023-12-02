const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const PORT = 3000;

mongoose.set('strictQuery', false);

const uri = process.env.API_KEY;


const start = async() => {
    await mongoose.connect(uri);

    app.listen(PORT, ()=>{
        console.log(`App listening on port ${PORT}`);
    })
}

start();