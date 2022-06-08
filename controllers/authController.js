const bcrypt = require("bcrypt");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const { generateError } = require("../lib");
const { loginValidation, registerValidation } = require("../validations");
const {
  createUser,
  findUserByEmail,
} = require("../repositories/authRepository");

const login = async (req, res, next) => {
  try {
    const { error, value } = loginValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const user = await findUserByEmail(value.email);

    if (!user) {
      generateError("Usuario o contraseña incorrectos", 401);
    }

    if (!user.is_active) {
      generateError("El usuario necesita ser activado.", 400);
    }

    const passwordMatch = await bcrypt.compare(
      value.password,
      user.hashed_password
    );

    if (!passwordMatch) {
      generateError("Usuario o contraseña incorrectos", 401);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.send("logout");
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { error, value } = registerValidation(req.body);

    console.log(error);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const user = await findUserByEmail(value.email);

    if (user) {
      generateError("El usuario con ese correo ya existe", 400);
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    // TODO: Las posibilidades de que los UUIDS colisionen son muy bajas, pero sería ideal asegurarse de que no se repitan
    const newUser = await createUser({
      firstName: value.first_name,
      lastName: value.last_name,
      email: value.email,
      hashedPassword,
      activationCode: uuidv4(),
    });

    if (!newUser) {
      generateError("No se pudo crear el usuario", 500);
    }

    // TODO: Enviar un email con el código de activación

    res.json({
      status: "success",
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  register,
};
