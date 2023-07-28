const Session = require('../models/Session');

const getAllSessions = async () => {
  try {
    const sessions = await Session.find();
    return {
        message: 'Session found',
        data: sessions
      };
  } catch (error) {
    return { error: 'Internal server error' };
  }
};

const getSessionById = async (request) => {
  const { id } = request;
  try {
    const session = await Session.findById(id);
    if (session) {
      return {
        message: 'Session found',
        data: session
      };
    } else {
      return { message: 'Session not found' };
    }
  } catch (error) {
    return { error: 'Internal server error' };
  }
};

const create = async (request) => {
  const { clientName, appointmentDate, phoneNumber, appointmentTime, category } = request;
  try {
    const session = new Session({
      clientName: clientName,
      appointmentDate: appointmentDate,
      phoneNumber: phoneNumber,
      appointmentTime: appointmentTime,
      category: category,
    });
    const savedSession = await session.save();
    return{
        message: 'Session created successfully',
        data: savedSession
    }
  } catch (error) {
    return{
        message: 'Session failed to create',
        data: error
    }
  }
};

const deleteSession = async (request) => {
  const { id } = request;
  try {
    const session = await Session.findByIdAndRemove(id);
    if (session) {
      return { message: 'Session deleted successfully' };
    } else {
      return { error: 'Session not found' };
    }
  } catch (error) {
    return { error: 'Internal server error' };
  }
};

module.exports = {
  getAllSessions,
  getSessionById,
  create,
  deleteSession
};
