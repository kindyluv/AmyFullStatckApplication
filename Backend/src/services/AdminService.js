const Admin = require ('../models/Admin');

const createNewAdmin = async (request) => {
  try {
    const existingAdmin = await findAdminByUserName(request.userName);

    if (existingAdmin) {
      return {
        message: 'Username already taken',
        data: null,
      };
    } else {
      const newAdmin = new Admin({
        userName: request.userName,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phoneNumber: request.phoneNumber,
        password: request.password,
        gender: request.gender,
      });

      const savedAdmin = await newAdmin.save();
      const response = {
        _id: savedAdmin._id,
        userName: savedAdmin.userName,
        firstName: savedAdmin.firstName,
        lastName: savedAdmin.lastName,
        email: savedAdmin.email,
        phoneNumber: savedAdmin.phoneNumber,
        gender: savedAdmin.gender,
      };

      return {
        message: 'Admin Successfully Created',
        data: response,
      };
    }
  } catch (error) {
    // console.error('Error creating admin:', error);
    return {
      message: 'Error creating admin',
      data: null,
    };
  }
};

const findAdminById = async id => {
  try {
    let admin = Admin.findById (id);
    return admin;
  } catch (error) {
    return {
      message: `Admin with id ${id} not found`,
      data: 'Please Enter a valid user id',
    };
  }
};

const findAdminByEmail = async email => {
  try {
    return await Admin.findOne ({email: email});
  } catch (error) {
    return {
      message: `No Admin found with this email ${email}`,
      data: 'No data',
    };
  }
};

const findAdminByUserName = async (userName) => {
  try {
      return await Admin.findOne({ userName: userName });
  } catch (error) {
      return {
          message: `No Admin found with this userName ${userName}`,
          data: 'No data'
      };
  }
};

const findAllAdmins = async () => {
  return Admin.find ()
    .then (response => {
      return {
        message: 'Successfully retrieved all users from db',
        data: response,
      };
    })
    .catch (error => {
      return {
        message: `Db is empty ${error}`,
        data: [],
      };
    });
};

const findAdminByPhoneNumber = async phoneNumber => {
  try {
    let admin = await Admin.findOne ({phoneNumber: phoneNumber});
    return admin;
  } catch (error) {
    return {
      message: `No Admin found with this phoneNumber ${phoneNumber}`,
      data: 'No data',
    };
  }
};

const updateAdmin = async (id, updatedData) => {
  try {
    const admin = await Admin.findById (id);
    if (!admin) {
      return {
        message: `Admin with ID ${id} not found`,
        data: null,
      };
    }

    admin.userName = updatedData.userName || admin.userName;
    admin.firstName = updatedData.firstName || admin.firstName;
    admin.lastName = updatedData.lastName || admin.lastName;
    admin.email = updatedData.email || admin.email;
    admin.phoneNumber = updatedData.phoneNumber || admin.phoneNumber;
    admin.password = updatedData.password || admin.password;
    admin.gender = updatedData.gender || admin.gender;

    if (updatedData.address) {
      const savedAddress = await saveNewAddress (updatedData.address);
      admin.address = savedAddress._id;
    }

    const updatedAdmin = await admin.updateOne ();

    return {
      message: 'Admin updated successfully',
      data: updatedAdmin,
    };
  } catch (error) {
    return {
      message: `Failed to update admin with ID ${id}`,
      data: error,
    };
  }
};

module.exports = {
  createNewAdmin,
  findAdminById,
  findAdminByEmail,
  findAllAdmins,
  findAdminByPhoneNumber,
  updateAdmin,
  findAdminByUserName,
};
