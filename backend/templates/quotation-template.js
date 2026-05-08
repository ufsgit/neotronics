const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(Number(amount) || 0);
};

const getQuotationTemplate = (data) => {
    const { master, details, company, bank } = data;
    const currency = master.CurrecnyName || '₹';
    
    let itemsHtml = details.map((item, index) => `
        <tr style="page-break-inside: avoid;">
            <td style="text-align: center; border: 1px solid #000;">${index + 1}</td>
            <td style="border: 1px solid #000;">
                <div style="font-weight: bold;">${item.Item_Name || item.ItemName || ''}</div>
                <div style="font-size: 10px; color: #555; margin-top: 2px;">${item.Description1 || ''}</div>
            </td>
            <td style="text-align: center; border: 1px solid #000;">${item.Quantity || 0}</td>
            <td style="text-align: center; border: 1px solid #000;">${item.Unit_Name || item.UnitName || 'Nos'}</td>
            <td style="text-align: right; border: 1px solid #000;">${formatCurrency(item.Rate || item.UnitPrice)}</td>
            <td style="text-align: right; border: 1px solid #000; font-weight: bold;">${formatCurrency((Number(item.Quantity) || 0) * (Number(item.Rate || item.UnitPrice) || 0))}</td>
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Quotation - ${master.QuotationNo || ''}</title>
    <style>
        @page {
            size: A4;
            margin: 15mm;
        }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            color: #000; 
            margin: 0; 
            padding: 0; 
            font-size: 11px;
            line-height: 1.4;
            background: #fff;
        }
        .container { width: 100%; }
        
        /* Header Section */
        .header { 
            display: flex; 
            justify-content: space-between; 
            align-items: flex-start;
            margin-bottom: 20px;
        }
        .logo-section { width: 40%; }
        .logo-text { font-size: 28px; font-weight: 800; letter-spacing: -1px; }
        .logo-text span { color: #e31e24; }
        
        .company-details { 
            width: 55%; 
            text-align: right; 
        }
        .company-name { font-size: 16px; font-weight: bold; color: #000; text-transform: uppercase; margin-bottom: 4px; }
        .company-info { font-size: 10px; color: #333; }

        /* Title */
        .doc-title { 
            text-align: center; 
            font-size: 20px; 
            font-weight: bold; 
            text-transform: uppercase; 
            margin: 10px 0 20px 0;
            border-bottom: 2px solid #000;
            padding-bottom: 5px;
        }

        /* Customer & Info Section */
        .info-section { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 20px;
        }
        .customer-box { width: 60%; }
        .details-box { width: 35%; text-align: right; }
        .section-label { 
            font-weight: bold; 
            text-transform: uppercase; 
            font-size: 10px; 
            color: #666; 
            border-bottom: 1px solid #eee;
            margin-bottom: 5px;
            display: inline-block;
        }

        /* Table Section */
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 20px;
            table-layout: fixed;
        }
        th { 
            background-color: #f2f2f2; 
            border: 1px solid #000; 
            padding: 8px 5px; 
            font-weight: bold; 
            text-transform: uppercase;
            font-size: 10px;
        }
        td { 
            padding: 8px 5px; 
            word-wrap: break-word;
        }

        /* Bottom Section */
        .bottom-section { 
            display: flex; 
            justify-content: space-between;
            margin-top: 10px;
        }
        .left-bottom { width: 60%; }
        .right-bottom { width: 35%; }

        .summary-table { width: 100%; margin-bottom: 0; }
        .summary-table td { padding: 4px 0; border: none; }
        .grand-total-row { 
            border-top: 1px solid #000; 
            border-bottom: 1px solid #000; 
            font-weight: bold; 
            font-size: 13px;
        }

        .bank-details, .terms-section { 
            margin-top: 15px; 
            font-size: 10px;
            padding: 8px;
            background: #f9f9f9;
            border-radius: 4px;
        }
        .bank-details strong, .terms-section strong { text-transform: uppercase; font-size: 9px; color: #555; }

        /* Signature Section */
        .signature-section { 
            margin-top: 50px; 
            text-align: right;
        }
        .sign-box { 
            display: inline-block; 
            text-align: center; 
            width: 200px;
        }
        .sign-placeholder { height: 60px; }
        .sign-label { border-top: 1px solid #000; padding-top: 5px; font-weight: bold; }

    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo-section">
                <div class="logo-text">NEO<span>TRONICS</span></div>
            </div>
            <div class="company-details">
                <div class="company-name">${company.Company_Name || 'NEOTRONICS'}</div>
                <div class="company-info">
                    ${company.Address1 || ''}<br>
                    ${company.Address2 || ''}, ${company.Address3 || ''}<br>
                    Phone: ${company.Phone || ''} | Email: ${company.Email || ''}<br>
                    GSTIN: ${company.Vat_No || company.GSTNo || ''}
                </div>
            </div>
        </div>

        <div class="doc-title">Quotation</div>

        <!-- Info Section -->
        <div class="info-section">
            <div class="customer-box">
                <div class="section-label">Estimate For</div><br>
                <strong style="font-size: 13px;">${master.Customer || master.Client_Accounts_Name || ''}</strong><br>
                ${master.Address1 || ''}<br>
                ${master.Address2 || ''}<br>
                ${master.Phone || master.Mobile || ''}
            </div>
            <div class="details-box">
                <div class="section-label">Quotation Details</div><br>
                <strong>No: ${master.QuotationNo || master.Sales_Master_No || ''}</strong><br>
                Date: ${master.FormattedEntryDate || master.EntryDate || ''}<br>
                Currency: ${currency}
            </div>
        </div>

        <!-- Item Table -->
        <table>
            <thead>
                <tr>
                    <th style="width: 30px;">#</th>
                    <th>Item Description</th>
                    <th style="width: 60px;">Qty</th>
                    <th style="width: 50px;">Unit</th>
                    <th style="width: 100px;">Price / Unit</th>
                    <th style="width: 110px;">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
        </table>

        <!-- Bottom Section -->
        <div class="bottom-section">
            <div class="left-bottom">
                <div style="margin-bottom: 15px;">
                    <div class="section-label">Amount in words</div><br>
                    <div style="font-style: italic; font-weight: bold;">${master.Amount_In_Words || ''}</div>
                </div>

                <div class="terms-section">
                    <strong>Terms & Conditions:</strong>
                    <ul style="margin: 5px 0; padding-left: 15px;">
                        <li>Validity: ${master.Validity || '15 Days'}</li>
                        <li>Delivery: ${master.Delivery || 'Ex-Stock'}</li>
                        <li>Price Basis: ${master.PriceBasis || 'DDP'}</li>
                        <li>Payment: ${master.PaymentTerms || 'Immediate'}</li>
                    </ul>
                </div>

                <div class="bank-details">
                    <strong>Bank Details:</strong><br>
                    Bank: ${bank.Client_Accounts_Name || ''}<br>
                    A/C No: ${bank.Client_Accounts_No || ''}<br>
                    Branch: ${bank.Address1 || ''}
                </div>
            </div>

            <div class="right-bottom">
                <table class="summary-table">
                    <tr>
                        <td style="text-align: left;">Sub Total</td>
                        <td style="text-align: right;">${currency} ${formatCurrency(master.TotalAmount || master.NetTotal)}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left;">Tax / VAT (0%)</td>
                        <td style="text-align: right;">${currency} 0.00</td>
                    </tr>
                    <tr class="grand-total-row">
                        <td style="text-align: left; padding: 10px 0;">Grand Total</td>
                        <td style="text-align: right; padding: 10px 0;">${currency} ${formatCurrency(master.TotalAmount || master.NetTotal)}</td>
                    </tr>
                </table>

                <div class="signature-section">
                    <div class="sign-box">
                        <div style="font-size: 10px;">For: <strong>${company.Company_Name || 'NEOTRONICS'}</strong></div>
                        <div class="sign-placeholder"></div>
                        <div class="sign-label">Authorized Signatory</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
};

module.exports = { getQuotationTemplate };
