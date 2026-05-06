const http = require('http');

const endpoints = [
  '/Requirement_Master/Get_Bill_Type/1',
  '/Requirement_Master/Load_Company/',
  '/Requirement_Master/Load_Vat_Percentage/'
];

function testEndpoint(path) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:3502${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log(`Endpoint: ${path}`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Data: ${data.substring(0, 100)}...`);
        console.log('---');
        resolve();
      });
    }).on('error', (err) => {
      console.log(`Endpoint: ${path}`);
      console.log(`Error: ${err.message}`);
      console.log('---');
      resolve();
    });
  });
}

async function runTests() {
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
  }
}

runTests();
