const Address = require("../models/Address");

const saveNewAddress = async (request) =>{
    try {

        let newAddress = new Address({
            streetName: request.streetName,
            streetNo: request.streetNo,
            country: request.country,
            state: request.state,
            localGovernment: request.localGovernment
          });
      
          let savedAddress = await newAddress.save();
      
          return savedAddress;
        
    } catch (error) {
        
    }
}

module.exports = { saveNewAddress };