const validator = require("validator");
const generator = require("generate-password");
const UserModel = require("../models/user-model");
const SendEmail = require("../utils/email-sender");

// initial user registration controller function
exports.register = async (req, res) => {
  const { email } = req.body;
  const password = generator.generate({
    length: 6,
    numbers: true,
  });
  const isExistingEmail = await findEmailDuplicates(email, res);
  const userId = await generateUserId(res);
  if (isExistingEmail) {
    return res.status(401).json({
      msg: "Email already exist, please try again with a new email",
    });
  }

  if (!isExistingEmail && userId) {
    try {
      // validate email using official standard RFC 5322
      if (!validator.isEmail(email)) {
        res.status(401).send({
          msg: "Invalid email address, please check again",
        });
      }
      await UserModel.create({
        id: userId,
        email,
        password,
      });
      await SendEmail(email, password, "http://localhost:3000/");
      return res.status(201).json({ msg: "Registration is half-way done!" });
    } catch (error) {
      return res.status(500).json({
        msg: "Error in register controller-" + error,
      });
    }
  }
};

// login controller function
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(422).json({
        msg: "Can not find the user, please check the email again",
      });
    } else {
      const isMatch = await user.matchPasswords(password);
      if (!isMatch) {
        res.status(401).send({
          msg: "Invalid credentials, please try again",
        });
      } else {
        const token = user.getSignedToken();
        const userEmail = user.email;
        const userStatus = user.status;
        const userAccountType = user.accountType;
        return res
          .status(200)
          .json({ token, userEmail, userStatus, userAccountType });
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Error in login controller-" + error,
    });
  }
};

// find duplicated user emails before register new user
const findEmailDuplicates = async (email, res) => {
  let existingAccount = null;

  try {
    existingAccount = await UserModel.findOne({ email: email });
    if (existingAccount) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return res.status(422).json({
      msg: "Error occurred in findUserByEmail function-" + err,
    });
  }
};

// generate incrementing user IDs
const generateUserId = async (res) => {
  let lastUserId = 0;
  try {
    const lastUser = await UserModel.find().sort({ id: -1 }).limit(1);
    if (lastUser.length > 0) {
      lastUserId = lastUser[0].id;
      return lastUserId + 1;
    } else {
      return 1;
    }
  } catch (error) {
    return res.status(422).json({
      msg: "Error occurred in generateUserId function-" + error,
    });
  }
};
