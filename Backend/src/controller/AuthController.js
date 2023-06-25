const AuthService = require('../services/AuthService');

const register = (req, res) => {
    AuthService.registerValidation(req.body)
    .then((response)=> {
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
}

const login = (req, res) => {
    AuthService.loginValidation(req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
}

module.exports = { register, login };