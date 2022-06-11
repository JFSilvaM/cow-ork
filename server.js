require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { handleError, notFound } = require("./middlewares");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const { PORT } = process.env;
const app = express();

try {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload());
  app.use(cors());
  app.use(express.static("public"));
  app.use(morgan("dev"));

  // Rutas de la aplicación
  app.use("/api", require("./routes"));

  // Manejo de rutas no encontradas
  app.use(notFound);

  // Manejo de errores
  app.use(handleError);

  app.listen(PORT, () => {
    console.log(`🚀 Servidor inicializado en http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(`❌ ${error}`);
  process.exit(1);
}
