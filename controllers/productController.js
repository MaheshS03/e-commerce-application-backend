const productModel = require('../models/productModel')

const getAllProducts = async(request, response) => {
    try {
        const products = await productModel.find()
        response.status(200).json(products)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const addNewProduct = async(request, response) => {
    const productToBeAdded = request.body
    try
    {
        const existingProduct = await productModel.findOne({name : productToBeAdded.name})
        if(existingProduct)
        {
            return response.status(409).send({message: `The product with name ${productToBeAdded.name} already exists`})
        }
        const insertedProduct = await productModel.create(productToBeAdded)
        response.status(201).json(insertedProduct)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const updateProduct = async(request, response) => {
    const {id} = request.query
    const {name, description, price, quantity} = request.body
    try
    {
        const updatedProduct = await productModel.updateMany({_id : id}, {name : name, description : description, price : price, quantity : quantity},{new : true})
        response.status(200).json(updatedProduct)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const deleteProduct = async(request, response) => {
    const {id} = request.query
    try
    {
        const deletedProduct = await productModel.deleteOne({_id : id})
        response.status(200).json(deletedProduct)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

module.exports = {getAllProducts, addNewProduct, updateProduct, deleteProduct}