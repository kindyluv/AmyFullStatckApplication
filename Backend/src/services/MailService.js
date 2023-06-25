const Admin = require('../models/Admin');
const nodemailer = require('nodemailer');

const sendEmail = async (request) => {
  try {
    const admin = await Admin.findOne({ email: request.emailAddress });
    if (!admin) {
      return {
        message: 'Admin not found',
        data: []
      };
    }

    const emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: request.emailAddress,
        pass: emailAddressPassword
      }
    });

    const mailOptions = {
      from: request.emailAddress,
      to: admin.email,
      subject: request.subject,
      text: request.content
    };

    await emailTransporter.sendMail(mailOptions);
    return {
      message: 'Email sent successfully',
      data: []
    };
  } catch (error) {
    return {
      message: `Failed to send email: ${error}`,
      data: []
    };
  }
};

module.exports = { sendEmail }