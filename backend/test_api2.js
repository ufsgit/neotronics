const http = require('http');

http.get('http://localhost:3502/Lead_Config/assignment/branch/Search', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    console.log("Data:", data);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
