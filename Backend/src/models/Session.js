const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    _id: {
        type: String
    },
    clientName: {
        type: String,
        // required: true,
    },
    appointmentDate: {
        type: String,
    },
    phoneNumber: {
        type: String
    },
    appointmentTime: {
        type: String,
    },
    category: {
        type: String
    }

})

sessionSchema.pre('save', function (next) {
    if (!this._id) {
      this._id = new mongoose.Types.ObjectId().toString();
    }
    return next();
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;