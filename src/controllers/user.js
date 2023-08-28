const userService = require("../services/user.js");
const httpResponse = require("../utils/httpResponse.js");

const userController = {
  getUsers: (req, res) => {
    userService.getUsers((code, err, result) => {
      res.status(code).json(httpResponse(res.statusCode, result, err));
    });
  },
  getUserById: (req, res) => {
    userService.getUserById(req, (code, err, result) => {
      res.status(code).json(httpResponse(res.statusCode, result, err));
    });
  },
  addUser: (req, res) => {
    userService.addUser(req, (code, err, result) => {
      res.status(code).json(httpResponse(res.statusCode, result, err));
    });
  },
  updateUserById: (req, res) => {
    userService.updateUserById(req, (code, err, result) => {
      res.status(code).json(httpResponse(res.statusCode, result, err));
    });
  },
  deleteUserById: (req, res) => {
    userService.deleteUserById(req, (code, err, result) => {
      res.status(code).json(httpResponse(res.statusCode, result, err));
    });
  },
  uploadAvatar: (req, res) => {
    try {
      userService.uploadAvatar(req, (code, err, result) => {
        res.status(code).json(httpResponse(res.statusCode, result, err));
      });
    } catch (error) {
      res.status(500).json(httpResponse(res.statusCode, null, error));
    }
  },
  updateAvatar: (req, res) => {
    try {
      userService.updateAvatar(req, (code, err, result) => {
        res.status(code).json(httpResponse(res.statusCode, result, err));
      });
    } catch (error) {
      res.status(500).json(httpResponse(res.statusCode, null, error));
    }
  },
};

module.exports = userController;
