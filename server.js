require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const { PORT } = process.env;
const app = express();

try {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(morgan("dev"));

  // Rutas de la aplicación
  app.use("/api", require("./routes"));

  app.listen(PORT, () => {
    console.log(`🚀 Servidor inicializado en http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(`❌ ${error}`);
  process.exit(1);
}
