const mongoose = require("mongoose");
const UserModel = require("../models/user-model");
const validator = require("validator");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const parsedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "admin-data.json"), "utf-8")
);

// admin account add
const addAdmin = async (data) => {
  if (
    data.email &&
    data.password &&
    data.accountType === "ADMIN" &&
    data.id === 0
  ) {
    try {
      // validate email using official standard RFC 5322
      if (!validator.isEmail(data.email)) {
        console.log("Invalid email address, please check again");
      }
      await UserModel.create(data);
      console.log("Admin account created");
      console.log({ email: data.email, password: data.password });
    } catch (error) {
      console.log("Error occurred!", error);
    }
    process.exit();
  }
};

const URI = process.env.MONGO_URI;

// mongodb connection
mongoose
  .connect(URI, { dbName: "surge_db" })
  .then(() => {
    console.log("MongoDB Connection Success");
    addAdmin(parsedData);
  })
  .catch((err) => {
    console.log("Connection Failed - " + err);
  });
