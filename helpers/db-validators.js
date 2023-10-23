const { User } = require('../models');


const emailAlreadyExists = async (email = '') => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new Error(`User ${email} already exists in the database`);
    }
  } catch (error) {
    throw new Error(`Error checking email existence: ${error.message}`);
  }
};

const idExists = async (id = '') => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error(`Id ${id} does not exist in the database`);
    }
  } catch (error) {
    throw new Error(`Error checking id existence: ${error.message}`);
  }
};

module.exports = {
  emailAlreadyExists,
  idExists,
};
