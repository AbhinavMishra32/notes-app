const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/productModel');
const app = express();

app.use(express.json());
// app.use(express.urlencoded(), {extended : true})

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

//add data
app.post('/products', async (req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }
    catch (err){
        console.log(err)
        res.status(500).json({message : err.message})
        // res.send(console.log("error"))
    }
  })

//fetch all products
app.get('/products', async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

//fetch product with id
app.get('/products/:id', async (req, res ) =>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//update a product
app.put('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        if(!product){
            return res.status(404).json({message : `Cannot find any product with id ${req.params.id}`})
        }
        const updatedProduct = await Product.findById(req.params.id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message : error.message})
        }
})


//delete a product

app.delete('/product/:id', async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        const deletedProduct = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message : `Cannot find any product with id ${req.params.id}`})
        }
        res.status(200).json(product)
    }
    catch(error){
        res.status(400).json({message : error.message});
    }
})
start();