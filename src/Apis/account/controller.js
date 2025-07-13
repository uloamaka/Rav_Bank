const accountService = require('./service');

exports.createWallet = async (req, res) => {
  try {
    const userId = req.user?.id; // depends on your auth middleware
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const account = await accountService.createCustomerAccount(req.body, userId);

    if (!account.success) {
      return res.status(400).json({ message: account.message });
    }

    res.status(201).json({
      message: account.message,
      data: account.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
