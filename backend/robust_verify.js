const http = require('http');
const fs = require('fs');

const endpoints = [
  '/Requirement_Master/Get_Bill_Type/1',
  '/Requirement_Master/Load_Company/',
  '/Requirement_Master/Load_Vat_Percentage/'
];

async function verify() {
  const results = [];
  for (const path of endpoints) {
    await new Promise((resolve) => {
      http.get(`http://127.0.0.1:3502${path}`, (res) => {
        let data = '';
        res.on('data', (d) => data += d);
        res.on('end', () => {
          results.push(`Endpoint: ${path}\nStatus: ${res.statusCode}\nData: ${data.substring(0, 50)}...\n`);
          resolve();
        });
      }).on('error', (e) => {
        results.push(`Endpoint: ${path}\nError: ${e.message}\n`);
        resolve();
      });
    });
  }
  fs.writeFileSync('verify_results.txt', results.join('\n---\n'));
  console.log('Results written to verify_results.txt');
}

verify();
