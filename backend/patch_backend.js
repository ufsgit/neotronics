const fs = require('fs');

function patchModel() {
    let content = fs.readFileSync('models/Sales_Master.js', 'utf8');
    
    // Find functions to clone
    const extractFunc = (startText) => {
        const startIdx = content.indexOf(startText);
        if (startIdx === -1) return null;
        let braceCount = 0;
        let inFunc = false;
        let endIdx = -1;
        for (let i = startIdx; i < content.length; i++) {
            if (content[i] === '{') {
                braceCount++;
                inFunc = true;
            } else if (content[i] === '}') {
                braceCount--;
                if (inFunc && braceCount === 0) {
                    endIdx = i + 1;
                    break;
                }
            }
        }
        return content.substring(startIdx, endIdx);
    };

    const funcsToClone = [
        'Save_Quotation: async function',
        'Search_Quotation:function',
        'Get_Quotation_Details:function',
        'Delete_Quotation_Master: function',
        'Load_SalesQuotationMaster:function'
    ];

    let appendedCode = '\n';
    for (let f of funcsToClone) {
        let code = extractFunc(f);
        if (code) {
            code = code.replace(/Quotation/g, 'Price_Request');
            code = code.replace(/quotation/g, 'price_request');
            // specifically for Load_SalesQuotationMaster
            code = code.replace(/Load_SalesPrice_RequestMaster/g, 'Load_Price_Request_Master');
            appendedCode += '    ,\n' + code;
        } else {
            console.log("Could not find", f);
        }
    }

    // Insert before module.exports or end of object
    content = content.replace(/};\s*module\.exports\s*=\s*Sales_Master;/g, appendedCode + '\n};\nmodule.exports=Sales_Master;');
    fs.writeFileSync('models/Sales_Master.js', content);
    console.log("Patched models/Sales_Master.js");
}

function patchRoutes() {
    let content = fs.readFileSync('routes/Sales_Master.js', 'utf8');

    const funcsToClone = [
        "router.post('/Save_Quotation/'",
        "router.get('/Search_Quotation'",
        "router.get('/Get_Quotation_Details'",
        "router.get('/Delete_Quotation_Master'",
        "router.get('/Load_SalesQuotationMaster/'"
    ];

    let appendedCode = '\n';
    for (let f of funcsToClone) {
        const startIdx = content.indexOf(f);
        if (startIdx === -1) {
            console.log("Could not find route", f);
            continue;
        }
        
        let braceCount = 0;
        let inFunc = false;
        let endIdx = -1;
        for (let i = startIdx; i < content.length; i++) {
            if (content[i] === '{') {
                braceCount++;
                inFunc = true;
            } else if (content[i] === '}') {
                braceCount--;
                if (inFunc && braceCount === 0) {
                    // find the closing parenthesis after }
                    endIdx = content.indexOf(')', i) + 1;
                    break;
                }
            }
        }
        let code = content.substring(startIdx, endIdx);
        code = code.replace(/Quotation/g, 'Price_Request');
        code = code.replace(/quotation/g, 'price_request');
        code = code.replace(/Load_SalesPrice_RequestMaster/g, 'Load_Price_Request_Master');
        appendedCode += code + '\n';
    }

    content = content.replace(/module\.exports\s*=\s*router;/g, appendedCode + '\nmodule.exports = router;');
    fs.writeFileSync('routes/Sales_Master.js', content);
    console.log("Patched routes/Sales_Master.js");
}

try {
    patchModel();
    patchRoutes();
} catch (e) {
    console.error(e);
}

