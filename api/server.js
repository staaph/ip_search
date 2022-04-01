const express = require('express');
const axios = require('axios');

const app = express();

app.get('/api/:ip', async (req, res) => {
  try {
    const data = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_IHLnxkiPdY3h6J0XxspzeOFb2P614&ipAddress=${req.params.ip}`
    );
    res.send(data.data);
  } catch (error) {
    res.send(error);
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
