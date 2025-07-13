const { z } = require('zod');

const createBankAccountSchema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  amount: z.string().regex(/^\d+$/, 'Amount must be a numeric string'),
});

module.exports = {
  createBankAccountSchema,
};
