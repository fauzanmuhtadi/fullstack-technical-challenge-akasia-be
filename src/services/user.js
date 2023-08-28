const userRepository = require("../repositories/user.js");
const upload = require("../utils/upload.js");

const userService = {
  getUsers: (res) => {
    userRepository.findAll((err, result) => {
      err ? res(500, err, result) : res(200, err, result);
    });
  },
  getUserById: (req, res) => {
    const params = req.params;
    userRepository.findById(params.id, (err, result) => {
      err
        ? res(500, err, result)
        : !result
        ? res(404, "Not found", result)
        : res(200, err, result);
    });
  },
  addUser: (req, res) => {
    const body = req.body;
    userRepository.findByEmail(body.email, (err, result) => {
      if (err) {
        res(500, err, result);
      } else if (result) {
        if (result.deleted_at !== null) {
          let data = { ...body, updated_at: new Date(), deleted_at: null };
          userRepository.rollback(result.id, data, (errors, results) => {
            errors ? res(500, errors, results) : res(200, errors, results);
          });
        } else {
          res(422, "User already exist", body);
        }
      } else {
        let data = { ...body, created_at: new Date(), updated_at: new Date() };
        userRepository.save(data, (error, results) => {
          error ? res(500, error, results) : res(200, error, body);
        });
      }
    });
  },
  updateUserById: (req, res) => {
    const body = req.body;
    const params = req.params;
    let data = { ...body, updated_at: new Date() };
    userRepository.findById(params.id, (err, result) => {
      err
        ? res(500, err, result)
        : !result
        ? res(404, "Not found", result)
        : userRepository.update(params.id, data, (errors, results) => {
            errors ? res(500, errors, results) : res(200, errors, results);
          });
    });
  },
  deleteUserById: (req, res) => {
    const params = req.params;
    let data = { updated_at: new Date(), deleted_at: new Date() };
    userRepository.findById(params.id, (err, result) => {
      err
        ? res(500, err, result)
        : !result
        ? res(404, "Not found", result)
        : userRepository.delete(params.id, data, (errors, results) => {
            errors ? res(500, errors, results) : res(200, errors, results);
          });
    });
  },
  uploadAvatar: (req, res) => {
    upload(null, req, (code, error, result) => {
      res(code, error, result);
    });
  },
  updateAvatar: (req, res) => {
    const params = req.params;
    userRepository.findById(params.id, (err, result) => {
      if (err) {
        res(500, err, result);
      } else if (!result) {
        res(404, "Not found", result);
      } else {
        if (result.avatar !== null) {
          const oldUrl = result.avatar.split("/");
          const oldFileName = oldUrl[oldUrl.length - 1];
          upload(oldFileName, req, (code, error, result) => {
            res(code, error, result);
          });
        } else {
          upload(null, req, (code, error, result) => {
            res(code, error, result);
          });
        }
      }
    });
  },
};

module.exports = userService;
