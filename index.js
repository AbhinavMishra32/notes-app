const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.set('strictQuery', false);


const start = async() => {
    await mongoose.connect();

    app.listen(PORT, ()=>{
        console.log('App listening on port ' + PORT);
    })
}

start();