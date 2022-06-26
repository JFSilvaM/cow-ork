require("dotenv").config();
const pool = require("../getPool")();

const migrate = async () => {
  try {
    console.log("🔧 Creando tablas...");

    await pool.query("DROP TABLE IF EXISTS space_services;");
    await pool.query("DROP TABLE IF EXISTS space_ratings;");
    await pool.query("DROP TABLE IF EXISTS reports;");
    await pool.query("DROP TABLE IF EXISTS report_categories;");
    await pool.query("DROP TABLE IF EXISTS bookings;");
    await pool.query("DROP TABLE IF EXISTS spaces;");
    await pool.query("DROP TABLE IF EXISTS space_types;");
    await pool.query("DROP TABLE IF EXISTS services;");
    await pool.query("DROP TABLE IF EXISTS users;");

    await pool.query(`
        CREATE TABLE users (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            hashed_password VARCHAR(255) NOT NULL,
            bio VARCHAR(255) NOT NULL DEFAULT '',
            avatar VARCHAR(255) NOT NULL DEFAULT 'default.png',
            is_admin BOOLEAN NOT NULL DEFAULT FALSE,
            is_active BOOLEAN NOT NULL DEFAULT FALSE,
            activation_code VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `);

    await pool.query(`
        CREATE TABLE services (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
    `);

    await pool.query(`
        CREATE TABLE report_categories (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
    `);

    await pool.query(`
        CREATE TABLE space_types (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
    `);

    await pool.query(`
        CREATE TABLE spaces (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            address VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL DEFAULT 'default.png',
            price DECIMAL(10,2) NOT NULL,
            capacity INT NOT NULL,
            is_clean BOOLEAN NOT NULL DEFAULT TRUE,
            type_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (type_id) REFERENCES space_types(id)
        );
    `);

    await pool.query(`
        CREATE TABLE bookings (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            space_id INT NOT NULL,
            user_id INT NOT NULL,
            start_date DATETIME NOT NULL,
            end_date DATETIME NOT NULL,
            is_paid BOOLEAN NOT NULL DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (space_id) REFERENCES spaces(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `);

    await pool.query(`
        CREATE TABLE reports (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            space_id INT NOT NULL,
            user_id INT NOT NULL,
            category_id INT NOT NULL,
            description TEXT NOT NULL,
            status ENUM('OPEN', 'CLOSED', 'PENDING') NOT NULL DEFAULT 'OPEN',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (space_id) REFERENCES spaces(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (category_id) REFERENCES report_categories(id)
        );
    `);

    await pool.query(`
        CREATE TABLE space_services (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            space_id INT NOT NULL,
            service_id INT NOT NULL,
            FOREIGN KEY (space_id) REFERENCES spaces(id) ON DELETE CASCADE,
            FOREIGN KEY (service_id) REFERENCES services(id)
        );
    `);

    await pool.query(`
        CREATE TABLE space_ratings (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            space_id INT NOT NULL,
            user_id INT NOT NULL,
            rating INT NOT NULL DEFAULT 0,
            FOREIGN KEY (space_id) REFERENCES spaces(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);

    console.log("✅ Tablas creadas correctamente.");
    process.exit(0);
  } catch (error) {
    console.error(`❌ ${error}`);
    process.exit(1);
  }
};

migrate();
