const express = require("express");
const env = require("../utils/env.js");
const userController = require("../controllers/user.js");

const router = express.Router();

router.get(`${env.BASE_URL}/user`, userController.getUsers);
router.get(`${env.BASE_URL}/user/:id`, userController.getUserById);
router.post(`${env.BASE_URL}/user`, userController.addUser);
router.put(`${env.BASE_URL}/user/:id`, userController.updateUserById);
router.delete(`${env.BASE_URL}/user/:id`, userController.deleteUserById);
router.post(`${env.BASE_URL}/user/avatar`, userController.uploadAvatar);
router.put(`${env.BASE_URL}/user/avatar/:id`, userController.updateAvatar);

module.exports = router;
