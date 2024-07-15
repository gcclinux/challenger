import express from 'express';
import fs from 'fs';
import { access, writeFile } from 'fs/promises';
import { constants } from 'fs';


const app = express();
const port = 3002;

app.use(express.json());

app.post('/api/append', (req, res) => {
  // Extract userName and score from the request body
  const { userName, score } = req.body;

  // Define the path to the JSON file where data will be saved
  const filePath = './data.json';

  async function ensureFileExists() {
    try {
      // Check if the file exists
      await access(filePath, constants.F_OK);
      console.log('File exists.');
    } catch (error) {
      // If the file does not exist, create it with initial square brackets
      await writeFile(filePath, '[ ]');
      console.log('File does not exist, created with initial square brackets.');
    }
  }
  
  ensureFileExists().catch(console.error);

  // Read the existing data from the file
  fs.readFile(filePath, (err, data) => {
    if (err && err.code === 'ENOENT') {
      // If the file does not exist, create it with the new data
      fs.writeFile(filePath, JSON.stringify([{ userName, score }]), (err) => {
        if (err) throw err;
        console.log('Data written to file');
        res.send('Data saved successfully');
      });
    } else if (err) {
      // Handle other errors
      throw err;
    } else {
      // If the file exists, append the new data
      const existingData = JSON.parse(data);
      existingData.push({ userName, score });
      fs.writeFile(filePath, JSON.stringify(existingData), (err) => {
        if (err) throw err;
        console.log('Data appended to file');
        res.send('Data saved successfully');
      });
    }
  });
});

// Endpoint to get sorted data
app.get('/scores', (req, res) => {
  const filePath = './data.json';

  console.log(`Received request for ${req.path} from ${req.ip} using method ${req.method}`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading data file');
      return;
    }

    console.log(`Raw data read from file: ${data.toString().substring(0, 100)}...`);

    try {
      let scores = JSON.parse(data);
      console.log(`Data after parsing and before sorting: ${JSON.stringify(scores).substring(0, 100)}...`);

      scores.sort((a, b) => b.score - a.score);

      console.log(`Data being provided to client: ${JSON.stringify(scores).substring(0, 100)}...`);
      res.setHeader('Content-Type', 'application/json'); // Explicitly set the Content-Type header
      res.json(scores);
    } catch (error) {
      console.error('Error parsing data:', error);
      res.status(500).send('Error processing data');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});