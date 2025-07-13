const authService = require('./service');

exports.signup = async (req, res) => {
    try {
        const result = await authService.signup(req.body);

        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.cookie('token', result.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: 'Strict',
            maxAge: 2 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: result.message
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message  });
    }
}

exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.cookie('token', result.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: 'Strict',
            maxAge: 2 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: result.message, user: result.data.user
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}