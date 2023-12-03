const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Customers = require('./models/customers');

const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

const uri = process.env.API_KEY;


const start = async() => {
    try{
        await mongoose.connect(uri);
        app.listen(PORT, ()=>{
            console.log('Connected to MongoDB')
            console.log(`App listening on port ${PORT}`);
        })
    }
    catch(error){
        console.log(error.message);
    }
    
}

app.get('/', (req, res) => {
    res.send('hello world')
  })

app.get('/product', (req, res) => {

})

app.post('/api', (req, res) => {
    res.send('This is a post request')
})

start();