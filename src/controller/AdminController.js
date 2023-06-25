const AdminService = require('../services/AdminService');

const createAdmin = (req, res) => {
  console.log('request --> ', req.body);
  AdminService.createNewAdmin(req.body)
    .then((response) => {
      res.json({
        response
      });
    })
    .catch((error) => {
      res.json({
        message: error
      });
    });
};

const findAdminById = (req, res, next) => {
  AdminService.findAdminById(req.params.id)
    .then((response) => {
      res.json({
        response
      });
    })
    .catch((error) => {
      res.json({
        message: error
      });
    });
};

const findByEmail = (req, res, next) => {
  AdminService.findAdminByEmail(req.params.email)
    .then((response) => {
      res.json({
        response
      });
    })
    .catch((error) => {
      res.json({
        message: error
      });
    });
};

const findAllAdmins = (req, res, next) => {
  AdminService.findAllAdmins()
    .then((response) => {
      res.json({
        response
      });
    })
    .catch((error) => {
      res.json({
        message: error
      });
    });
};

const findAdminByPhoneNumber = (req, res, next) => {
  AdminService.findAdminByPhoneNumber(req.params.phoneNumber)
    .then((response) => {
      res.json({
        response
      });
    })
    .catch((error) => {
      res.json({
        message: error
      });
    });
};

const updateAdmin = (req, res, next) => {
    AdminService.updateAdmin(req.id, req.body)
      .then((response) => {
        res.json({
          response
        });
      })
      .catch((error) => {
        res.json({
          message: error
        });
      });
  };
  
module.exports = { createAdmin, findAdminById, findByEmail, findAllAdmins, findAdminByPhoneNumber, updateAdmin };
