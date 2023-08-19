const express = require('express');
const app = express();
const request = require('request');

app.get('/numbers', (req, res) => {
  const urls = req.query.url;
  const uniqueNumbers = [];

  for (const url of urls) {
    const options = {
      timeout: 500,
    };

    request(options, url, (error, response, body) => {
      if (error) {
        console.log(error);
        return;
      }

      const numbers = JSON.parse(body)['numbers'];

      for (const number of numbers) {
        if (!uniqueNumbers.includes(number)) {
          uniqueNumbers.push(number);
        }
      }
    });
  }

  res.send({
    numbers: uniqueNumbers,
  });
});

app.listen(8008);
console.log('Server listening on port 8008');