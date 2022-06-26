const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const MIGRATIONS_DIR = path.join(__dirname, "migrations");

fs.readdirSync(MIGRATIONS_DIR).forEach((file) => {
  try {
    console.log(`🔧 Migrando ${file}...`);

    const { stderr, status } = spawnSync("node", [
      path.join(MIGRATIONS_DIR, file),
    ]);

    if (status !== 0) {
      throw new Error(stderr);
    }

    console.log(`✅ ${file} migrado correctamente.\n`);
  } catch (error) {
    console.error(error.message);
  }
});
