const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/Apis/auth/routes');
const accountRoutes = require('./src/Apis/account/routes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Health route or root welcome
app.get('/', (req, res) => {
  res.send('Rav Bank API is live');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/account', accountRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
