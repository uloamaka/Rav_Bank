const bcrypt = require('bcrypt');
const knex = require('../../db/knex');
const { generateToken } = require('../../utils/jwt');
const { signupSchema, loginSchema } = require('./validation');

exports.signup = async (input) => {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstErrorField = Object.keys(errors)[0];
    const firstErrorMessage = errors[firstErrorField][0];

    return {
      success: false,
      message: firstErrorMessage, 
    };
  }

  const { email, password } = parsed.data;

  const existingUser = await knex('users').where({ email }).first();
  if (existingUser) {
    return { success: false, message: 'Email already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await knex('users')
    .insert({ email, password: hashedPassword })
    .returning(['id', 'email', 'role']);

  const token = generateToken(user);

  return { success: true, message: 'Signup successful', data: { user, token } };
};


exports.login = async (input) => {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstErrorField = Object.keys(errors)[0];
    const firstErrorMessage = errors[firstErrorField][0];

    return {
      success: false,
      message: firstErrorMessage, 
    };
  }

  const { email, password } = parsed.data;

  const user = await knex('users').where({ email }).first();
  if (!user) {
    return { success: false, message: 'Invalid credentials' };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: 'Invalid credentials' };
  }

  const token = generateToken(user);

  return {
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      },
      token,
    },
  };
};
