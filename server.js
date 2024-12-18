const express = require('express');
const app = express();

app.use(express.json());

app.post('/scraped-data', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  res.status(200).send('Data received successfully!');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
