const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/Apis/auth/routes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Health route or root welcome
app.get('/', (req, res) => {
  res.send('Rav Bank API is live');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
