const Subscribe = require('../models/Subscriber');

const addSubscriber = async (email) => {
    try {
      const subscriber = await Subscribe.create({ email });
      return subscriber;
    } catch (error) {
      throw new Error('Failed to add subscriber: ' + error);
    }
};

module.exports = { addSubscriber }
