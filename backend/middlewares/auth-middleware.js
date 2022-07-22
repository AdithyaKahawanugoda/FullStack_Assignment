const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

exports.protectedUser = async (req, res, next) => {
  const decoded = tokenValidate(req, res);
  try {
    const user = await UserModel.findById(decoded.objId);
    if (!user) {
      noUserResponse(res);
    } else if (user.accountType !== "USER") {
      accessDeniedResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(401).json({ msg: "Something went wrong, access denied" });
  }
};

exports.protectedAdmin = async (req, res, next) => {
  const decoded = tokenValidate(req, res);
  try {
    const user = await UserModel.findById(decoded.objId);
    if (!user) {
      noUserResponse(res);
    } else if (user.accountType !== "ADMIN") {
      accessDeniedResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(401).json({ msg: "Something went wrong, access denied" });
  }
};

exports.protectedStudent = async (req, res, next) => {
  const decoded = tokenValidate(req, res);
  try {
    const user = await UserModel.findById(decoded.objId);
    if (!user) {
      noUserResponse(res);
    } else if (user.accountType !== "STUDENT") {
      accessDeniedResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(401).json({ msg: "Something went wrong, access denied" });
  }
};

const tokenValidate = (reqObj, res) => {
  let token;
  let decoded;

  if (
    reqObj.headers.authorization &&
    reqObj.headers.authorization.startsWith("Bearer")
  ) {
    token = reqObj.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ msg: "Not Authorized to Access" });
  } else {
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ msg: "Your session has been expired, please login again" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ msg: err.message });
      } else {
        return res
          .status(401)
          .json({ msg: "Something went wrong, access denied" });
      }
    }
  }

  return decoded;
};

const noUserResponse = (res) => {
  return res.status(404).json({ msg: "No user found with this ID" });
};

const accessDeniedResponse = (res) => {
  return res.status(404).json({ msg: "Access Denied!" });
};
