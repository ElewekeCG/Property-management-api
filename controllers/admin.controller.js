const {
    registerAdmin,
    authenticateAdmin,
    registerUser,
    getUsers,
    deleteUser,
} = require("../services/admin.service");

const { responseHandler } = require('../utils/responseHandler');

exports.signup = async(req, res) => {
    try {
        const check = await registerAdmin(req.body);
    
        if (!check[0]) return responseHandler(res, check[1], 400, false, null);
    
        return responseHandler(res, "Signup successful", 201, true);
      } catch (error) {
        console.error(error);
        return responseHandler(res, "An error occurred. Server error", 500, false);
    }
};

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const check = await authenticateAdmin(username, password);
  
      if (!check[0]) return responseHandler(res, check[1], 400, false, null);
  
      const { token, user } = check[1];
  
      res.cookie("authToken", token, {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, //24hrs
        httpOnly: true,
      });
  
      return responseHandler(res, "Login successful", 200, true, {
        token,
        user,
      });
    } catch (error) {
      console.error(error);
      return responseHandler(res, "An error occurred. Server error", 500, false);
    }
};

exports.createUser = async (req, res) => {
  try {
      const result = await registerUser(req.body);

      if(!result[0]) return responseHandler(res,  result[1], 400, false, null);

      return responseHandler(res, "User created successfully", 200, true, result[1]);
  } catch (error) {
      console.error(error);
      return responseHandler(res, "server error", 500, false);
  }
};

exports.getAllUsers = async (req, res) => {
    try {
      const users = await getUsers();
  
      if (!users || users.length === 0) return responseHandler(res, "no users found", 400, false);
  
    //   excluding passwords from the result
      const usersResult = users.map(user => {
        const { password, ...userResult } = user;
        return userResult;
      });
      return responseHandler(res, `successful`, 200, true, usersResult);
    } catch (error) {
      console.error(error);
      return responseHandler(res, "An error occurred. Server error", 500, false);
    } 
  };

  exports.deleteuser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const result = await deleteUser(userId);

      if(!result){
        return responseHandler(res, "User not found", 404, false);
      }

      return responseHandler(res, 'User Dlelted successfully', 200, true);

    } catch (error) {
      console.error(error);
      return responseHandler(res, "An error occurred. Server error", 500, false);
    }
  };
  