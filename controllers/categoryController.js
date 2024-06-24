const categoryModel = require('../models/categoryModel')

const getAllCategories = async(request, response) => {
    try {
        const categories = await categoryModel.find()
        response.status(200).json(categories)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const addNewCategory = async(request, response) => {
    const categoryToBeAdded = request.body
    try
    {
        const existingCategory = await categoryModel.findOne({name : categoryToBeAdded.name})
        if(existingCategory)
        {
            return response.status(409).send({message: `The category with name ${categoryToBeAdded.name} already exists`})
        }
        const insertedCategory= await categoryModel.create(categoryToBeAdded)
        response.status(201).json(insertedCategory)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const updateCategory = async(request, response) => {
    const {id} = request.query
    const { name, description} = request.body

    try
    {
        const updatedCategory = await categoryModel.findOneAndUpdate({_id : id},{name : name, description : description}, {new :true})
        response.status(200).json(updatedCategory)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const deleteCategory = async(request, response) => {
    const {id} = request.query

    try
    {
        const deletedCategory = await categoryModel.deleteOne({_id : id})
        response.status(200).json(deletedCategory)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

module.exports = {getAllCategories, addNewCategory, updateCategory, deleteCategory}