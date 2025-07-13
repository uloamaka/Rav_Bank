const ravenClient = require('../../utils/ravenApi');
const knex = require('../../db/knex');
const { createBankAccountSchema } = require('./validation');

exports.createCustomerAccount = async (input, userId) => {
  const parsed = createBankAccountSchema.safeParse(input);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstErrorField = Object.keys(errors)[0];
    const firstErrorMessage = errors[firstErrorField][0];

    return {
      success: false,
      message: firstErrorMessage,
    };
  }

  const { first_name, last_name, email, amount, phone } = parsed.data;

  const response = await ravenClient.post('/pwbt/generate_account', {
    first_name,
    last_name,
    email,
    phone,
    amount,
  });

  const account = response.data.data;

  await knex('bank_accounts').insert({
    user_id: userId,
    account_number: account.account_number,
    account_name: account.account_name,
    bank_name: account.bank,
    is_permanent: account.isPermanent || false,
    initial_amount: parseFloat(account.amount || '0'),
  });

  // Update user with first_name, last_name, phone
  await knex('users').where({ id: userId }).update({
    first_name,
    last_name,
    phone,
  });

  return {
    success: true,
    message: 'Bank account created and user updated successfully',
    data: {
      account_number: account.account_number,
      bank_name: account.bank,
      account_name: account.account_name,
    },
  };
};
