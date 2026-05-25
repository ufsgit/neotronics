const http = require('http');
const path = require('path');
const jwt = require(path.join(__dirname, '../backend/node_modules/jsonwebtoken'));
const config = require('../backend/config.json');

// Sign a valid token
const token = jwt.sign({ sub: { User_Id: 1, User_Name: 'Test' } }, config.secret);

const options = {
    hostname: 'localhost',
    port: 3502,
    path: '/Item/Get_Multiple_Sale_Rates/22',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    }
};

const req = http.request(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        console.log("API Status Code:", resp.statusCode);
        console.log("API Response Body:", JSON.parse(data));
    });
});

req.on("error", (err) => {
    console.log("Error: " + err.message);
});

req.end();
