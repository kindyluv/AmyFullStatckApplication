const AdminService = require('./AdminService');
const validateLoginInput = require('../models/auth/validator/LoginValidation');
const validateRegisterInput = require('../models/auth/validator/RegisterValidation');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken')

const registerValidation = async (request) => {
    // const { errors, isValid } = validateRegisterInput(request)

    // if(!isValid){
    //     return{
    //         message: `Not Found ${errors}`,
    //         data: ''
    //     }
    // }

    try {
        console.log('hi i got here')

        const admin = AdminService.createNewAdmin(request);
        const { _id, userName } = admin;
        const token = jwt.sign({ _id: _id, userName: userName }, 'privatekey');

        return{
            message: `User Account Successfully Created, User Id is ${_id} and UserName is ${userName}`,
            data: `Auth Token ${token}`
        }
    } catch (error) {
        return{
            message: 'Username already taken',
            data: []
        }
    }
}

const loginValidation = async (request) => {
    const { isValid } = validateLoginInput(request);

    if(!isValid){
        return{
            message: `Username and password is required`,
            data: ''
        }
    }

    try {
        const admin = await Admin.findOne({
            userName: request.userName
        })

        if(!admin){
            return{
                message: 'Invalid credentials'
            }
        }

        const { _id, userName } = admin;

        const valid = await admin.validatePassword(request.password);
        if(valid){
            const token = jwt.sign({ _id: _id, userName: userName }, 'privatekey');

            return{
                message: `User Successfully Logged, \n User Id is ${_id} and UserName is ${userName}`,
                data: token
            }
        }
        else{
            return{
                message: 'Invalid credentials'
            }
        }
    } catch (error) {
        return{
            message: 'Invalid User',
            data: []
        }
    }
}

module.exports = { registerValidation, loginValidation };