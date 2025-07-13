const { z } = require('zod');

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  phone_number: z.string().min(10, { message: 'Phone number is required must be 10 characters' }),
});

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password is required' }),
});

module.exports = { signupSchema, loginSchema };