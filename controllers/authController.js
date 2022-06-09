const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { generateError } = require("../lib");
const { loginValidation, registerValidation } = require("../validations");
const {
  createUser,
  findUserByEmail,
  updateUserActivation,
} = require("../repositories/authRepository");
const {
  USER_ACTIVATION,
  USER_INVALID_CREDENTIALS,
  USER_EXISTS,
  USER_CANNOT_BE_REGISTERED,
  USER_REGISTERED,
  USER_CANNOT_BE_ACTIVATED,
  USER_ACTIVATED,
} = require("../messages/messages.json");

const login = async (req, res, next) => {
  try {
    const { error, value } = loginValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const user = await findUserByEmail(value.email);

    // Generamos el mismo error tanto si no se encuentra al usuario como si no está activado
    if (!user || !user.is_active) {
      generateError(USER_ACTIVATION, 400);
    }

    const passwordMatch = await bcrypt.compare(
      value.password,
      user.hashed_password
    );

    if (!passwordMatch) {
      generateError(USER_INVALID_CREDENTIALS, 401);
    }

    const tokenPayload = {
      id: user.id,
      is_admin: user.is_admin,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      status: "success",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { error, value } = registerValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const user = await findUserByEmail(value.email);

    if (user) {
      generateError(USER_EXISTS, 400);
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
      generateError(USER_CANNOT_BE_REGISTERED, 500);
    }

    // TODO: Enviar un email con el código de activación

    res.json({
      status: "success",
      message: USER_REGISTERED,
    });
  } catch (error) {
    next(error);
  }
};

const activate = async (req, res, next) => {
  try {
    const affectedRows = await updateUserActivation(req.params.activation_code);

    if (!affectedRows) {
      generateError(USER_CANNOT_BE_ACTIVATED, 500);
    }

    res.json({
      status: "success",
      message: USER_ACTIVATED,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  activate,
};
