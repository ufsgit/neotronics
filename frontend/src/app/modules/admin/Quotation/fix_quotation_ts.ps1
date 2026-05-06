
$path = "frontend\src\app\modules\admin\Quotation\Quotation.component.ts"
$content = Get-Content $path
$startLine = 589
$endLine = 754

$newLines = @(
"Print_Click()",
"{  ",
"    this.printAcknowledgeCharge1per = false;",
"    this.printAcknowledgeChargeAmount1 = false;",
"    this.printAcknowledgeChargeAmount2 = false;",
"    this.printAcknowledgeVAT_Amount = false;",
"    this.printAcknowledgeDiscount_Description = false;",
"    this.printAcknowledgeAdditional_Discount = false;",
"    this.printAcknowledgeRoundoff_Amt = false;",
"    this.printAcknowledgeTotalDiscount = false;",
"    ",
"    this.Quotation_Master_.EntryDate = this.formatDate(this.Quotation_Master_.EntryDate);",
"    this.Quotation_Master_.PrintDate = this.formatPrintDate(this.Quotation_Master_.EntryDate);",
"",
"    setTimeout(() => {",
"        const printContent = document.getElementById(`"Print_Div1`");",
"        if (!printContent) return;",
"        ",
"        const innerContents = printContent.innerHTML;",
"        const popupWinindow = window.open('', '_blank', 'width=800,height=900,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,titlebar=no');",
"        ",
"        if (popupWinindow) {",
"            popupWinindow.document.open();",
"            popupWinindow.document.write(``",
"                <html>",
"                    <head>",
"                        <title>Quotation Print</title>",
"                        <style>",
"                            ${this.Get_Quotation_Print_Css()}",
"                        </style>",
"                    </head>",
"                    <body onload=`"window.print(); window.close();`">",
"                        ${innerContents}",
"                    </body>",
"                </html>",
"            ``);",
"            popupWinindow.document.close();",
"        }",
"    });",
"}"
)

$contentBefore = $content[0..($startLine - 2)]
$contentAfter = $content[($endLine)..$content.Length]

$finalContent = $contentBefore + $newLines + $contentAfter
$finalContent | Set-Content $path -Encoding UTF8
