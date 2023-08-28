const path = require("path");
const fs = require("fs");
const env = require("../utils/env.js");

const upload = (oldFileName, request, result) => {
  if (request.files === null) {
    result(400, "No File Uploaded", null);
  } else {
    const name = request.body.title;
    const file = request.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = `{{{${name}}}}-${file.md5}${ext}`;
    const url = `${request.protocol}://${request.get("host")}/${
      env.FOLDER_AVATAR
    }/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      result(422, "Invalid file", null);
    } else if (fileSize > 1000000) {
      result(422, "File must be less than 1 MB", null);
    } else {
      if (oldFileName) {
        const filepath = `./${env.FOLDER_AVATAR}/${oldFileName}`;
        fs.unlinkSync(filepath);
        file.mv(`./${env.FOLDER_AVATAR}/${fileName}`, (err) => {
          if (err) {
            result(500, err.message, null);
          } else {
            result(200, "Upload success", { name, avatar: fileName, url });
          }
        });
      } else {
        file.mv(`./${env.FOLDER_AVATAR}/${fileName}`, (err) => {
          if (err) {
            result(500, err.message, null);
          } else {
            result(200, "Upload success", { name, avatar: fileName, url });
          }
        });
      }
    }
  }
};

module.exports = upload;
