const subCategoryModel = require('../models/subCategoryModel')

const getAllSubCategories = async(request, response) => {
    try {
        const subCategories = await subCategoryModel.find()
        response.status(200).json(subCategories)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const addNewSubCategory = async(request, response) => {
    const subCategoryToBeAdded = request.body
    try
    {
        const existingSubCategory = await subCategoryModel.findOne({name : subCategoryToBeAdded.name})
        if(existingSubCategory)
        {
            return response.status(409).send({message: `The subCategory with name ${subCategoryToBeAdded.name} already exists`})
        }
        const insertedSubCategory= await subCategoryModel.create(subCategoryToBeAdded)
        response.status(201).json(insertedSubCategory)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const updateSubCategory = async(request, response) => {
    const {name} = request.body
    const {id} = request.query
    try
    {
        const updatedSubCategory = await subCategoryModel.findOneAndUpdate({_id : id}, {name : name}, {new : true})
        response.status(200).json(updatedSubCategory)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const deleteSubCategory = async(request, response) => {
    const {id} = request.query
    try
    {
        const deletedSubCategory = await subCategoryModel.deleteOne({_id : id})
        response.status(200).json(deletedSubCategory)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

module.exports = {getAllSubCategories, addNewSubCategory, updateSubCategory, deleteSubCategory}