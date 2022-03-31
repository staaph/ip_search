import express from 'express';
import axios from 'axios';

const app = express();

app.get('/api', async (req, res) => {
  const response = await axios.get(
    'https://geo.ipify.org/api/v2/country,city?apiKey=at_IHLnxkiPdY3h6J0XxspzeOFb2P614&ipAddress=8.8.8.8'
  );
  res.send(response);

  return response;
});

app.listen(8000);
