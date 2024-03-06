const express = require('express');

const router = express.Router();

const {ProductModel} = require('../models/Products');


router.get('/product', async (req, res) => {
    try {
        const products = await ProductModel.find();
        console.log('Products:', products);
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Get product by id
router.get('/:id', async(req, res) => {
    const product = await ProductModel.findById(req.params.id);
    res.send(product);
});

// Add new product 
router.post('/createproduct', async(req, res) => {
    const product = new ProductModel(req.body);
    await product.save();
    res.send(product);
});

// Update product
router.put('/:id', async(req, res) => {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    res.send(product);
});

// Delete product
router.delete('/:id', async(req, res) => {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    res.send(product);
});

module.exports={router}; 