const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// user profile update
exports.updateProfile = async (req, res) => {
  const profileData = req.body;
  const email = req.user.email;

  try {
    // first time login check
    if (!req.user.status) {
      if (!profileData.password) {
        return res.status(400).json({
          msg: "Please provide a new password to proceed",
        });
      } else {
        await UserModel.findOneAndUpdate(
          { email },
          {
            $set: profileData,
          }
        );
        await resetPassword(email, profileData.password);
        await updateUserAccountType(email);
        await updateStatus(email, true);
        res.status(200).json({
          msg: "Profile updated successfully",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error in updateProfile controller-" + error,
    });
  }
};

// get all users
exports.getUsers = async (req, res) => {
  try {
    let query = UserModel.find();

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * pageSize;
    const total = await UserModel.countDocuments();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        msg: "No page found",
      });
    }

    const users = await query;

    res.status(200).json({
      count: users.length,
      page,
      pages,
      users,
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

// get user email
exports.getUserEmail = async (req, res) => {
  try {
    const userEmail = req.user.email;
    return res.status(200).json({
      userEmail,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in getUserById controller-" + error,
    });
  }
};

// get results for user search
exports.getUserBySearchTerm = async (req, res) => {
  const term = req.query.term;
  let user;
  let result;
  try {
    if (parseInt(term)) {
      result = await UserModel.findOne({ id: term });
      user = [result];
    } else if (validator.isEmail(term)) {
      result = await UserModel.findOne({ email: term });
      user = [result];
    } else {
      user = await UserModel.aggregate([
        { $match: { $or: [{ firstName: term }, { lastName: term }] } },
      ]);
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in getUserBySearchTerm controller-" + error,
    });
  }
};

const resetPassword = async (email, newPassword) => {
  try {
    // hash password before saving into db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "Error in resetPassword controller-" + error,
    });
  }
};

const updateStatus = async (email, status) => {
  try {
    await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          status: status,
        },
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "Error in updateStatus controller-" + error,
    });
  }
};

const updateUserAccountType = async (email) => {
  try {
    await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          accountType: "STUDENT",
        },
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "Error in updateUserAccountType function-" + error,
    });
  }
};
