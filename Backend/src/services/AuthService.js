const AdminService = require('./AdminService');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken')

const registerValidation = async (request) => {
  try {
    const admin = await AdminService.createNewAdmin(request);
    const { _id, userName } = admin.data;
    const token = jwt.sign({ _id, userName }, 'privatekey');

    return {
      message: `User Account Successfully Created, User Id is ${_id} and UserName is ${userName}`,
      data: `Auth Token ${token}`
    };
  } catch (error) {
    // console.error('Error creating admin:', error);
    return {
      message: 'Error creating admin',
      data: []
    };
  }
};

const loginValidation = async (request) => {
  try {
    const user = await Admin.findOne({
      userName: request.userName
    });

    if (!user) {
      return {
        message: 'Invalid credentials'
      };
    }

    const { _id, userName } = user;

    const valid = await user.validatePassword(request.password);
    if (valid) {
      const token = jwt.sign({ _id, userName }, 'privatekey');
      return {
        message: `User Successfully Logged In\nUser Id is ${_id} and UserName is ${userName}`,
        data: token
      };
    } else {
      return {
        message: 'Invalid credentials'
      };
    }
  } catch (error) {
    // console.error('Error during login:', error);
    return {
      message: 'Invalid User',
      data: []
    };
  }
};

module.exports = { registerValidation, loginValidation };