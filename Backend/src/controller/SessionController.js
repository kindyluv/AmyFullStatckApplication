const SessionService = require('../services/SessionService')

const createSession = (req, res) => {
    SessionService.create(req.body)
      .then((response) => {
        res.json({
          message: 'Session created successfully',
          data: response,
        });
      })
      .catch((error) => {
        res.json({
          message: error
        });
      });
  }

  const getAllSession = (req, res) => {
    SessionService.getAllSessions()
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

  const getSessionById = (req, res) => {
    SessionService.getSessionById(req.params)
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

  const deleteSession = (req, res) => {
    SessionService.deleteSession(req.params)
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

  module.exports = { createSession, getAllSession, getSessionById, deleteSession }