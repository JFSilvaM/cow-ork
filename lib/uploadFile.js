const path = require("path");
const { v4: uuidv4 } = require("uuid");
const generateError = require("./generateError");

const uploadFile = async (file, id, dir) => {
  try {
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const ALLOWED_EXTENSIONS = /(.jpe?g|.png)$/;

    const fileExtension = path.extname(file.name).toLowerCase();
    const fileName = `${uuidv4()}-${id + fileExtension}`;
    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      dir,
      fileName
    );

    if (file.size > MAX_FILE_SIZE) {
      generateError("El límite para subir imágenes es de 2MB", 400);
    }

    if (!fileExtension.match(ALLOWED_EXTENSIONS)) {
      generateError(
        `Extensión de archivo '${fileExtension}' no válida, solo se acepta .jpg, .jpeg o .png`,
        400
      );
    }

    await file.mv(filePath);

    // TODO: Implementar un sistema para borrar la imagen anterior

    return fileName;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadFile,
};
