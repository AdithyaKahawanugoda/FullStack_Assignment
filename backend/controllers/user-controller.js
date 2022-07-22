const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");

// user profile update controller function
exports.updateProfile = async (req, res) => {
  // const { firstName, lastName, dateOfBirth, mobile } = req.body;
  const profileData = req.body;
  const email = req.user.email;
  try {
    // first time login check
    if (!req.user.status) {
      if (!profileData.newPassword) {
        return res.status(400).json({
          msg: "Please provide a new password to proceed",
        });
      } else {
        await resetPassword(email, profileData.newPassword);
        await updateStatus(email, true);
      }
    }
    await UserModel.findOneAndUpdate(
      { email },
      {
        $set: profileData,
      }
    );
    return res.status(200).json({
      msg: "Profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in updateProfile controller-" + error,
    });
  }
};

// get all users
exports.getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    return res.status(200).send({
      allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in getUsers controller-" + error,
    });
  }
};

// get user by id
exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findOne({ id });
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in getUserById controller-" + error,
    });
  }
};

const resetPassword = async (email, newPassword) => {
  try {
    // hash password before saving into db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log({ newPassword: newPassword, hashedPassword: hashedPassword });
    const passwordUpdatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    console.log({ passwordUpdatedUser: passwordUpdatedUser });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in resetPassword controller-" + error,
    });
  }
};

const updateStatus = async (email, status) => {
  try {
    const statusUpdatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          status: status,
        },
      }
    );
    console.log({ statusUpdatedUser: statusUpdatedUser });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in updateStatus controller-" + error,
    });
  }
};
