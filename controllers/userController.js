const productModel = require('../models/productModel')
const categoryModel = require('../models/categoryModel')
const subCategoryModel = require('../models/subCategoryModel')

const authenticateUser = async(request, response) => {
    response.status(200).json({status: 'success', code:200, message: 'Welcome to User Dashboard'})
}

const searchByProductName = async(request, response) => {
    const {name} = request.params
    try{
        const searchedProduct = await productModel.find({name})
        if(searchedProduct.length === 0)
        {
            return response.status(404).json({message : 'Not Found'})
        }
        return response.status(200).json({searchedProduct})    
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const searchByCategory = async(request, response) => {
    const {name} = request.params
    try{
        const searchedCategory = await categoryModel.find({name})
        if(searchedCategory.length === 0)
        {
            return response.status(404).json({message : 'Not Found'})
        }
        return response.status(200).json({searchedCategory})    
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const searchBySubCategory = async(request, response) => {
    const {name} = request.params
    try{
        const searchedSubCategory = await subCategoryModel.find({name})

        if(searchedSubCategory.length === 0)
        {
            return response.status(404).json({message : 'Not Found'})
        }
        return response.status(200).json({searchedSubCategory})    
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

module.exports = {authenticateUser, searchByProductName, searchByCategory, searchBySubCategory}