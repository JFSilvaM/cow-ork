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
  ACCOUNT_ACTIVATION,
  USER_ACTIVATION,
  USER_INVALID_CREDENTIALS,
  USER_EXISTS,
  USER_CANNOT_BE_REGISTERED,
  USER_REGISTERED,
  USER_CANNOT_BE_ACTIVATED,
  USER_ACTIVATED,
} = require("../messages/messages.json");
const sendMail = require("../lib/sendMail");

const { HOST, PORT } = process.env;

const login = async (req, res, next) => {
  try {
    const value = await loginValidation(req.body);

    const user = await findUserByEmail(value.email);

    if (!user) {
      generateError(USER_INVALID_CREDENTIALS, 401);
    }

    if (!user.is_active) {
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
    const value = await registerValidation(req.body);

    const user = await findUserByEmail(value.email);

    if (user) {
      generateError(USER_EXISTS, 400);
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    const activationCode = uuidv4();

    const newUser = await createUser({
      firstName: value.first_name,
      lastName: value.last_name,
      email: value.email,
      hashedPassword,
      activationCode,
    });

    if (!newUser) {
      generateError(USER_CANNOT_BE_REGISTERED, 500);
    }

    await sendMail(
      ACCOUNT_ACTIVATION,
      templateContent({ value, activationCode }),
      "register"
    );

    res.json({
      data: {
        status: "success",
        message: USER_REGISTERED,
      },
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
      data: {
        status: "success",
        message: USER_ACTIVATED,
      },
    });
  } catch (error) {
    next(error);
  }
};

const templateContent = ({ value, activationCode }) => ({
  fullName: `${value.first_name} ${value.last_name}`,
  siteUrl: `${HOST}:${PORT}/api/auth/activate/${activationCode}`,
  email: value.email,
});

module.exports = {
  login,
  register,
  activate,
};
