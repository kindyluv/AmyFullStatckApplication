const validator = require('validator')
const IsEmpty = require('./IsEmpty')

const validateRegisterInput = (data) => {
    let errors = {}

    data.userName = !IsEmpty(data.userName) ? data.userName : ''
    data.password = !IsEmpty(data.password) ? data.password : ''

    if (!validator.isLength(data.userName, {
            min: 2,
            max: 30
        })) {
        errors.userName = 'userName should be between 2 and 30 characters'

    }
    if (validator.IsEmpty(data.userName)) {
        errors.userName = 'userName is required'
    }
    if (validator.IsEmpty(data.password)) {
        errors.password = 'Password is required'
    }
    if (!validator.isLength(data.password, {
            min: 8,
            max: 30
        })) {
        errors.password = 'Password should be at least 8 characters'
    }

    return {
        errors,
        isValid: IsEmpty(errors)
    }
}

module.exports = validateRegisterInput