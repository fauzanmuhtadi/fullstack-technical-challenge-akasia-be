const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const router = require("./src/routes/routes.js");
const env = require("./src/utils/env.js");
const db = require("./src/config/database.js");

const app = express();
const port = env.DB_PORT || 3306;
const path = `./${env.FOLDER_AVATAR}`;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(router);

fs.access(path, (error) => {
  if (error) {
    fs.mkdir(path, (error) => {
      if (error) {
        console.error("Error creating folder:", error);
      } else {
        console.log(`Folder ${env.FOLDER_AVATAR} created successfully`);
      }
    });
  } else {
    console.log(`Folder ${env.FOLDER_AVATAR} already exists`);
  }
});

const createTableUserQuery = `
    create table if not exists user (
        id int auto_increment primary key,
        email varchar(255) not null,
        first_name varchar(255) default null,
        last_name varchar(255) default null,
        avatar varchar(255) default null,
        created_at datetime default null,
        updated_at datetime default null,
        deleted_at datetime default null
    )
`;
db.query(createTableUserQuery, (error, results) => {
  if (error) {
    console.error("Error creating table:", error);
  } else {
    console.log("Table User created successfully");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
