const axios = require('axios');

const ravenClient = axios.create({
  baseURL: process.env.RAVEN_API_BASEURL,
  headers: {
    Authorization: `Bearer ${process.env.RAVEN_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

module.exports = ravenClient;
