const validator = require('validator')
const IsEmpty = require('./IsEmpty')

const validateLoginInput = (data) => {
    const errors = {}

    data.userName = !IsEmpty(data.userName) ? data.userName : ''
    data.password = !IsEmpty(data.password) ? data.password : ''

    if (validator.IsEmpty(data.userName)) {
        errors.userName = ''
    }
    if (validator.IsEmpty(data.password)) {
        errors.password = ''
    }
    return {
        errors,
        isValid: IsEmpty(errors)
    }
}

module.exports = validateLoginInput