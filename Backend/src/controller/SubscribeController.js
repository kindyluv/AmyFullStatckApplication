const subscribeService = require('../services/SubscribeService');

const addSubscriber = async (req, res) => {
    const { email } = req.body;
    await subscribeService.addSubscriber(email)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
};

module.exports = { addSubscriber }
