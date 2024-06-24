const userModel = require('../models/userModel')

const authenticateAdmin = async(request, response) => {
    response.status(200).json({status: 'success', message: 'Welcome to Admin Dashboard'})
}

module.exports = {authenticateAdmin}