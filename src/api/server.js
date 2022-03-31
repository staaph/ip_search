const express = require('express');
const axios = require('axios');

const app = express();

app.get('/api/ip/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const data = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_IHLnxkiPdY3h6J0XxspzeOFb2P614&ipAddress=${query}`
    );
    res.send(data.data);
  } catch (error) {
    res.send(error);
  }
});

const PORT = 8000;

app.enable('cors');

app.listen(PORT, () => console.log('Server is running'));