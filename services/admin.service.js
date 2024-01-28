const adminModel = require("../models/admin");
const { translateError } = require("../utils/mongo_helper");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/token");
const verifyPasswordPolicy = require("../utils/passwordPolicy");
const passwordOperations = require("../utils/password");
const userModel = require('../models/User');

exports.registerAdmin = async (body) => {
  try {
    const { name, username, password } = body;

    if (!(await verifyPasswordPolicy(password)))
      return [false, "Password is too weak."];

    const user = await adminModel.create({
      name,
      username,
      password,
    });
    console.log(user);
    if (!user) return [false, "Failed to signup"];

    return [true, user];
  } catch (error) {
    console.log(error);
    return [false, translateError(error) || "Unable to signup"];
  }
};

exports.authenticateAdmin = async (username, password) => {
  try {
    const user = await adminModel.findOne({ username });
    console.log(user);

    if (!user) return [false, "Incorrect username or password"];

    const { name, username: userUsername } = user;

    if (!(await passwordOperations.comparePassword(password, user.password)))
      return [false, "Incorrect username or password"];

    return [
      true,
      {
        token: await createToken(user.id),
        user: {
          name,
          username: userUsername,
        },
      },
    ];
  } catch (error) {
    console.log(error);
    return [false, translateError(error) || "login failed"];
  }
};

exports.registerUser = async (body) => {
  try {
    const { name, username, password} = body;

    if (!(await verifyPasswordPolicy(password)))
      return [false, "Password is too weak."];

    const user = await userModel.create({
      name,
      username,
      password,
    });
    console.log(user);
    if (!user) return [false, "Failed to create user"];

    return [true, user];
  } catch (error) {
    console.log(error);
    return [false, translateError(error) || "Unable to create user"];
  }
};

exports.getUsers = async () => {
  try {
    const users = await userModel.find();
    return [true, users];
  } catch (error) {
    console.log(error);
    return [false, translateError(error) || "Unable to retrieve users"];
  }
};

exports.deleteUser = async (userId) => {
    try {
        const deletionResult = await userModel.findByIdAndDelete(userId);

        if(deletionResult){
          return {success: true};
        } else {
          return {success: false};
        }
    } catch (error) {
        console.log(error);
        return [false, translateError(error) || "Unable to delete user"]
    }
};

