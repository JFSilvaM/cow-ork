const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const pool = require("../database/getPool")();
const generateError = require("./generateError");
const {
  UPLOAD_SIZE_LIMIT_REACHED,
  UPLOAD_EXTENSION_NOT_ALLOWED,
} = require("../messages/messages");

const uploadFile = async (file, id, dir) => {
  try {
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const ALLOWED_EXTENSIONS = /(.jpe?g|.png)$/;

    const fileExtension = path.extname(file.name).toLowerCase();
    const fileName = uuidv4() + fileExtension;
    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      dir,
      fileName
    );

    if (file.size > MAX_FILE_SIZE) {
      generateError(UPLOAD_SIZE_LIMIT_REACHED, 400);
    }

    if (!fileExtension.match(ALLOWED_EXTENSIONS)) {
      generateError(UPLOAD_EXTENSION_NOT_ALLOWED, 400);
    }

    await file.mv(filePath);

    let query;

    switch (dir) {
      case "avatars":
        query = "UPDATE users SET avatar = ? WHERE id = ?";
        break;

      case "spaces":
        query = "UPDATE spaces SET image = ? WHERE id = ?";
        break;
    }

    await pool.query(query, [fileName, id]);

    return fileName;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadFile,
};
