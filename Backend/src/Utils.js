const generateSessionId = () => {
    const timestamp = new Date().getTime().toString();
    const random = Math.random().toString(36).substr(2);
    return `${timestamp}-${random}`;
  };
  
  module.exports = { generateSessionId }