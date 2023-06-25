const PaymentService = require('../services/PaymentService')

const intializePayment = (req, res) => {
    PaymentService.intializePayment(req.body)
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
}

const verifyPayment = (req, res) => {
    PaymentService.verifyPayment(req.params)
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
}

module.exports = { intializePayment, verifyPayment }