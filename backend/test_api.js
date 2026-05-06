
const axios = require('axios');

async function testSave() {
    try {
        const response = await axios.post('http://localhost:3502/sales_order_master/Save_Sales_Order_Master/', {});
        console.log('Response:', response.status, response.data);
    } catch (error) {
        if (error.response) {
            console.log('Error Response:', error.response.status, error.response.data);
        } else {
            console.log('Error Message:', error.message);
        }
    }
}

testSave();
