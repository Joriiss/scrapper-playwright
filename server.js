const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Store received data in memory
let receivedData = null;

// Endpoint to receive scraped data
app.post('/scraped-data', (req, res) => {
  receivedData = req.body; // Save the received data
  console.log('Received data:', receivedData);
  res.status(200).send('Data received successfully!');
});

// Endpoint to get the stored data for the frontend
app.get('/scraped-data', (req, res) => {
  res.json(receivedData || { message: 'No data received yet' });
});

// Serve the frontend with Bootstrap
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Scraped Data</title>
      <!-- Bootstrap CSS -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          padding: 2rem;
        }
        table {
          margin-top: 1rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="text-center">Received Scraped Data</h1>
        <table class="table table-bordered table-striped">
          <thead class="table-dark">
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody id="data-table">
            <tr>
              <td colspan="2" class="text-center">No data received yet</td>
            </tr>
          </tbody>
        </table>
      </div>

      <script>
        async function fetchData() {
          const response = await fetch('/scraped-data');
          const data = await response.json();
          const tableBody = document.getElementById('data-table');

          // Clear the current table rows
          tableBody.innerHTML = '';

          if (data.message) {
            tableBody.innerHTML = '<tr><td colspan="2" class="text-center">' + data.message + '</td></tr>';
          } else {
            Object.entries(data).forEach(([key, value]) => {
              const row = document.createElement('tr');
              row.innerHTML = '<td>' + key + '</td><td>' + value + '</td>';
              tableBody.appendChild(row);
            });
          }
        }

        // Fetch and populate the table on page load
        fetchData();
      </script>
    </body>
    </html>
  `);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
