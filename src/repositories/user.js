const db = require("../config/database.js");

const userRepository = {
  findAll: (result) => {
    db.query(
      "select id, first_name, last_name, email, avatar from user where deleted_at is null",
      (err, results) => (err ? result(err, null) : result(null, results))
    );
  },
  findById: (id, result) => {
    db.query(
      "select id, first_name, last_name, email, avatar from user where id = ? and deleted_at is null",
      [id],
      (err, results) => (err ? result(err, null) : result(null, results[0]))
    );
  },
  findByEmail: (email, result) => {
    db.query("select * from user where email = ?", [email], (err, results) => {
      err ? result(err, null) : result(null, results[0]);
    });
  },
  save: (data, result) => {
    db.query("insert into user set ?", [data], (err, results) => {
      err ? result(err, null) : result(null, results);
    });
  },
  update: (id, data, result) => {
    db.query(
      "update user set first_name = ?, last_name = ?, avatar = ?, updated_at = ? where id = ?",
      [data.first_name, data.last_name, data.avatar, data.updated_at, id],
      (err, results) => (err ? result(err, null) : result(null, results))
    );
  },
  delete: (id, data, result) => {
    db.query(
      "update user set updated_at = ?, deleted_at = ? where id = ?",
      [data.updated_at, data.deleted_at, id],
      (err, results) => (err ? result(err, null) : result(null, results))
    );
  },
  rollback: (id, data, result) => {
    db.query(
      "update user set first_name = ?, last_name = ?, avatar = ?, updated_at = ?, deleted_at = ? where id = ?",
      [
        data.first_name,
        data.last_name,
        data.avatar,
        data.updated_at,
        data.deleted_at,
        id,
      ],
      (err, results) => (err ? result(err, null) : result(null, results))
    );
  },
};

module.exports = userRepository;
