const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/append', (req, res) => {
  const { userName, score } = req.body;

  fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    let json = JSON.parse(data);
    json.push({ userName, score });

    fs.writeFile('data.json', JSON.stringify(json, null, 2), (err) => {
      if (err) throw err;
      res.json({ message: 'Data appended successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});