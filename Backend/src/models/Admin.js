const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const adminUserSchema = new Schema(
  {
    _id: {
      type: String
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    phoneNumber: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    gender: {
      type: String
    }
  },
  { timestamps: true }
);

adminUserSchema.pre('save', async function (next) {
  try {
    if (!this._id) {
      this._id = new mongoose.Types.ObjectId().toString();
    }

    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

adminUserSchema.methods.validatePassword = async function (password, next) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return next(error);
  }
};

const Admin = mongoose.model('Admin', adminUserSchema);

module.exports = Admin;
