import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, timeout } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { param } from 'jquery';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
@Injectable({providedIn: 'root'})

export class Sales_Master_Service {
constructor(private http: HttpClient)
{
    const httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
}AnimationKeyframesSequenceMetadata
private extractData(res: Response)
{
let body = res; return body || { };
}
fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
fileExtension = '.xlsx';
public exportExcel(jsonData: any[], fileName: string): void 
{
  const ws: any = XLSX.utils.json_to_sheet(jsonData);
  const wb: any = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' as any });
  this.saveExcelFile(excelBuffer, fileName);
}
private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
  FileSaver.saveAs(data, fileName + this.fileExtension);
}
Save_Sales_Master(Sales_Master_)
{
    return this.http.post(environment.BasePath +'Sales_Master/Save_Sales_Master/',Sales_Master_).pipe(timeout(60000));
}
   
Save_Quotation(Quotation_Master_)
{
    return this.http.post(environment.BasePath +'Sales_Master/Save_Quotation/',Quotation_Master_).pipe(timeout(60000));
}

Save_Price_Request(Price_Request_Master_)
{
    return this.http.post(environment.BasePath +'Sales_Master/Save_Price_Request/',Price_Request_Master_).pipe(timeout(60000));
}




Save_Sales_Master_Mobile(Sales_Master_)
{
    return this.http.post(environment.BasePath +'Sales_Master/Save_Sales_Master_Mobile/',Sales_Master_).pipe(timeout(60000));
}
Search_Item_Typeahead(Item_Name):Observable<any>
{
    var Search_Data = { 'Item_Name': Item_Name}
    return this.http.get(environment.BasePath + 'Stock/Get_Stock_Item_Typeahead/',  { params: Search_Data });
}

Get_Stock_Item_Code_Typeahead(Item_Code):Observable<any>
{
    debugger
    var Search_Data = { 'Item_Code': Item_Code}
    return this.http.get(environment.BasePath + 'Stock/Get_Stock_Item_Code_Typeahead/',  { params: Search_Data });
}

Get_Stock_Details_By_Item_Code_Typeahead(Item_Code):Observable<any>
{
    debugger
    var Search_Data = { 'Item_Code': Item_Code}
    return this.http.get(environment.BasePath + 'Stock/Get_Stock_Details_By_Item_Code_Typeahead/',  { params: Search_Data });
}


Search_Sales_Item_Typeahead(Item_Name):Observable<any>
{
    var Search_Data = { 'Item_Name': Item_Name}
    return this.http.get(environment.BasePath + 'Stock/Get_Sales_Item_Typeahead/',  { params: Search_Data });
}

Search_Salesreturn_Item_Typeahead(Item_Name):Observable<any>
{
    var Search_Data = { 'Item_Name': Item_Name}
    return this.http.get(environment.BasePath + 'Stock/Get_ItemsforSalesReturn_Item_Typeahead/',  { params: Search_Data });
}

Load_B2B_SaleTax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Sales_Master/Load_B2B_SaleTax_Report/', { params: Search_Data });
}
Load_B2C_SaleTax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Sales_Master/Load_B2C_SaleTax_Report/', { params: Search_Data });
}
Load_Hsn_Sales_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Sales_Master/Load_Hsn_Sales_Report/', { params: Search_Data });
}
Load_Hsn_Sales_Return_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Sales_Master/Load_Hsn_Sales_Return_Report/', { params: Search_Data });
}
Load_Sales_Return_Tax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Sales_Master/Load_Sales_Return_Tax_Report/', { params: Search_Data });
}
Get_Sales_Barcode_Typeahead(Barcode):Observable<any>
{
    var Search_Data = { 'Barcode': Barcode }
    return this.http.get(environment.BasePath + 'Stock/Get_Sales_Barcode_Typeahead/', { params: Search_Data });
}
Item_Typeahead(Item_Name):Observable<any>
{
    var Search_Data = { 'Item_Name': Item_Name}
    return this.http.get(environment.BasePath + 'Item/Item_Typeahead/',  { params: Search_Data });
}
Search_Barcode_Typeahead(Barcode):Observable<any>
{
    if(Barcode==undefined)
    Barcode="";
    return this.http.get(environment.BasePath +'Stock/Get_Barcode_Typeahead/'+Barcode);
}
Search_Customer_Typeahead(Client_Id,Item_Name):Observable<any>
{
    if(Item_Name==undefined)
    Item_Name="";
    
    return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);
}

Search_Customer_Typeahead_1(Client_Id,Name):Observable<any>
{
    if(Name==undefined)
        Name="";

    var Search_Data = { 'Client_Id': Client_Id,'AccountName':Name}
    
    return this.http.get(environment.BasePath + 'Client_Accounts/Accounts_Typeahead_1/',  { params: Search_Data });
}




// Search_Supplier_Typeahead(Client_Id,Item_Name):Observable<any>
// {
//  return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);}

Load_ItemDetails_MobileSales(To_Employee_Id_):Observable<any>
{
    return this.http.get(environment.BasePath +'Stock/Load_ItemDetails_MobileSales/'+To_Employee_Id_);
}
// Search_Sales_Master(
//     look_In_Date_Value,
//     From_Date,
//     To_Date,
//     Customer,
//     QuotNo,
//     partNo,
//     Item_Group_Id_,
//     CurrencyDetails_Id_,
//     AccountType_Id_,
//     User_Details_Id_):Observable<any>
// {    
//     return this.http.get(environment.BasePath +'Sales_Master/Search_Sales_Master/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date+'/'+Customer+'/'+QuotNo+'/'+partNo+'/'+Item_Group_Id_+'/'+CurrencyDetails_Id_+'/'+AccountType_Id_+'/'+User_Details_Id_);
// }


Search_Sales_Master(look_In_Date_Value,From_Date,To_Date,Customer,QuotNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,Account_Type_Id_,User_Details_Id_,
    User_Type, Login_User_Id
):Observable<any>
{
    // if(Item_Name==undefined)
    //     Item_Name="";  

    var Search_Data = { 
        'Is_Date_Check_': look_In_Date_Value,
        'From_Date_': From_Date,
        'To_Date_': To_Date,
        'Customer_': Customer,
        'QuotNo_': QuotNo,
        'partNo_': partNo,
        'Item_Group_Id_': Item_Group_Id_,
        'CurrencyDetails_Id_': CurrencyDetails_Id_,
        'AccountType_Id_': Account_Type_Id_,
        'User_Details_Id_': User_Details_Id_,
        'User_Type': User_Type,
        'Login_User_Id': Login_User_Id
    }
    return this.http.get(environment.BasePath + 'Sales_Master/Search_Sales_Master/',  { params: Search_Data });
}

Get_Sales_Details(Sales_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Sales_Details/'+Sales_Master_Id);
}

// Search_Quotation(look_In_Date_Value,From_Date,To_Date,Customer,QuotNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_):Observable<any>
// {    
//     return this.http.get(environment.BasePath +'Sales_Master/Search_Quotation/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date+'/'+Customer+'/'+QuotNo+'/'+partNo+'/'+Item_Group_Id_+'/'+CurrencyDetails_Id_+'/'+User_Details_Id_);
// }

Search_Quotation(look_In_Date_Value,From_Date,To_Date,Customer,QuotNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
    User_Type_,Login_User_Id_
):Observable<any>
{
    // if(Item_Name==undefined)
    //     Item_Name="";  
    var Search_Data = { 
        'Is_Date_Check_': look_In_Date_Value,
        'From_Date_': From_Date,
        'To_Date_': To_Date,
        'Customer_': Customer,
        'QuotNo_': QuotNo,
        'partNo_': partNo,
        'Item_Group_Id_': Item_Group_Id_,
        'CurrencyDetails_Id_': CurrencyDetails_Id_,
        'User_Details_Id_': User_Details_Id_,
        'User_Type_':User_Type_,
        'Login_User_Id_':Login_User_Id_
    }
    return this.http.get(environment.BasePath + 'Sales_Master/Search_Quotation/',  { params: Search_Data });
}

Search_Price_Request(look_In_Date_Value,From_Date,To_Date,Customer,QuotNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
    User_Type_,Login_User_Id_
):Observable<any>
{
    var Search_Data = { 
        'Is_Date_Check_': look_In_Date_Value,
        'From_Date_': From_Date,
        'To_Date_': To_Date,
        'Customer_': Customer,
        'QuotNo_': QuotNo,
        'partNo_': partNo,
        'Item_Group_Id_': Item_Group_Id_,
        'CurrencyDetails_Id_': CurrencyDetails_Id_,
        'User_Details_Id_': User_Details_Id_,
        'User_Type_':User_Type_,
        'Login_User_Id_':Login_User_Id_
    }
    return this.http.get(environment.BasePath + 'Sales_Master/Search_Price_Request/',  { params: Search_Data });
}

Search_Sales_Master_Mobile(look_In_Date_Value,From_Date,To_Date,Customer_Id,Voucher_No,Employee_Id):Observable<any>
{     
    return this.http.get(environment.BasePath +'Sales_Master/Search_Sales_Master_Mobile/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date+'/'+Customer_Id+'/'+Voucher_No+'/'+Employee_Id);
}
Delete_Sales_Master(Sales_Master_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Delete_Sales_Master/'+Sales_Master_Id);
}

Delete_Quotation_Master(SalesQuotationMaster_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Delete_Quotation_Master/'+SalesQuotationMaster_Id);
}

Delete_Price_Request_Master(Price_Request_Master_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Delete_Price_Request_Master/'+Price_Request_Master_Id);
}


Change_Bill_Status(Sales_Master_Id,Bill_Type)
{
    return this.http.get(environment.BasePath +'Sales_Master/Change_Bill_Status/'+Sales_Master_Id+'/'+Bill_Type);
}

Get_ReferenceId_ByQuotation(SalesQuotationMaster_Id): Observable<any> {
    return this.http.get(environment.BasePath + 'Sales_Master/Get_ReferenceId_ByQuotation/' + SalesQuotationMaster_Id);
}

Get_Proforma_History_ByReference(ReferenceID): Observable<any> {
    return this.http.get(environment.BasePath + 'Sales_Master/Get_Proforma_History_ByReference/' + ReferenceID);
}

Update_Quotation_Workflow_Status(SalesQuotationMaster_Id: number, StatusCode: string): Observable<any> {
    return this.http.get(environment.BasePath + 'Sales_Master/Update_Quotation_Workflow_Status/' + SalesQuotationMaster_Id + '/' + encodeURIComponent(StatusCode || ''));
}
Delete_Sales_Master_Mobile(Sales_Master_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Delete_Sales_Master_Mobile/'+Sales_Master_Id);
}
Get_Sales_Details_forprint(Sales_Master_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Sales_Details_forprint/'+Sales_Master_Id);
}
Get_Sales_Master(Sales_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Details/Get_Sales_Details/'+Sales_Master_Id);
}


Get_Quotation_Details(Sales_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Quotation_Details/'+Sales_Master_Id);
}


Get_Quotation_Master(Quotation_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Quotation_Master/'+Quotation_Master_Id);
}

Get_Price_Request_Details(Sales_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Price_Request_Details/'+Sales_Master_Id);
}

Get_Price_Request_Master(Price_Request_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Price_Request_Master/'+Price_Request_Master_Id);
}
Get_Sales_Master_Mobile(Sales_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Details/Get_Sales_Details_Mobile/'+Sales_Master_Id);
}
Get_Receipt_Voucher_Mobile(Sales_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Receipt_Voucher_Mobile/'+Sales_Master_Id);
}
Load_Cess():Observable<any>
{ 
    return this.http.get(environment.BasePath +'Sales_Master/Load_Cess');
}
Load_Company_Bank():Observable<any>
{ 
    return this.http.get(environment.BasePath +'Sales_Master/Load_Company_Bank');
}s
Load_Bill_Mode():Observable<any>
{ 
    return this.http.get(environment.BasePath +'Sales_Master/Load_Bill_Mode');
}
Load_Bill_Type(Group_Id):Observable<any>
{ 
    return this.http.get(environment.BasePath +'Sales_Master/Get_Bill_Type/'+ Group_Id);
}

Load_Company():Observable<any>
{ 
    return this.http.get(environment.BasePath +'Sales_Master/Load_Company/');
}

// Get_Location(callback)
// {
//     return this.http.get('http://geolocation-db.com/jsonp', callback);
//    // return this.http.get('http://agentapi.applywindow.com/api/Level/');
//     // $.get("https://ipinfo.io?token=$TOKEN", function(response) {
//     //     console.log(response.ip, response.country);
//     //   }, "jsonp")    
// }
Get_Location()
{
return this.http.get(environment.BasePath +'Sales_Master/Get_Location/');
}




 Save_Prodution_Master(Prodution_Master_)
{
        return this.http.post(environment.BasePath + 'Sales_Master/Save_Prodution_Master/', Prodution_Master_);
}

    Search_Prodution_Master(Is_Date_Check_, FromDate_,ToDate_,Production_No_):Observable<any>
{
        var Search_Data = { 'Is_Date_Check_': Is_Date_Check_, 'FromDate_': FromDate_, 'ToDate_': ToDate_, 'Production_No_': Production_No_}
    return this.http.get(environment.BasePath + 'Sales_Master/Search_Prodution_Master/',  { params: Search_Data });
}

    Get_Prodution_Master(Production_Master_Id_):Observable<any>
{
        return this.http.get(environment.BasePath + 'Sales_Master/Get_Prodution_Master/' + Production_Master_Id_);
}
    Delete_Prodution_Master(Production_Master_Id_):Observable<any>
{
        return this.http.get(environment.BasePath + 'Sales_Master/Delete_Prodution_Master/' + Production_Master_Id_);
}

// Load_Hsn_Sales_Report(Search_FromDate, Search_ToDate): Observable<any> 
// {
//     var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
//     return this.http.get(environment.BasePath + 'Sales_Master/Load_Hsn_Sales_Report/', { params: Search_Data });
// }

Save_PerformaInvoice(performainvoicemaster_)
{
    debugger
    return this.http.post(environment.BasePath +'Sales_Master/Save_PerformaInvoice/',performainvoicemaster_);
}


Search_PerformaInvoice(look_In_Date_Value,From_Date,To_Date,Customer,InvoiceNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,
    User_Type, Login_User_Id
):Observable<any>
{    
    var Search_Data = { 'look_In_Date_Value': look_In_Date_Value,
                        'From_Date':From_Date,
                        'To_Date':To_Date,
                        'Customer':Customer,
                        'InvoiceNo':InvoiceNo,
                        'partNo':partNo,
                        'Item_Group_Id_':Item_Group_Id_,
                        'CurrencyDetails_Id_':CurrencyDetails_Id_,
                        'AccountType_Id_':AccountType_Id_,
                        'User_Type':User_Type,
                        'Login_User_Id':Login_User_Id,
                      }
    return this.http.get(environment.BasePath + 'Sales_Master/Search_PerformaInvoice/',  { params: Search_Data });
    // return this.http.get(environment.BasePath +'Sales_Master/Search_PerformaInvoice/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date+'/'+Customer+'/'+InvoiceNo+'/'+partNo+'/'+Item_Group_Id_+'/'+CurrencyDetails_Id_+'/'+AccountType_Id_);
}

Load_StatementofAccount_Report(Client_Id_,From_Date,To_Date,Voucher_,CurrencyId_,TypeId_,User_Type,Login_User_Id):Observable<any>
{    
    return this.http.get(environment.BasePath +'Sales_Master/Load_StatementofAccount_Report/'+Client_Id_+'/'+From_Date+'/'+To_Date+'/'+Voucher_+'/'+CurrencyId_+'/'+TypeId_+'/'+User_Type+'/'+Login_User_Id);
}

Delete_Performa_Invoice_Master(PerformaInvoiceMaster_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Delete_Performa_Invoice_Master/'+PerformaInvoiceMaster_Id);
}


Get_Item_Code_Typeahead(Item_Code):Observable<any>
{
    var Search_Data = { 'Item_Code': Item_Code}
    return this.http.get(environment.BasePath + 'Stock/Get_Item_Code_Typeahead/',  { params: Search_Data });
}

Get_Itemname_Typeahead(Item_Name):Observable<any>
{
    var Search_Data = { 'Item_Name': Item_Name}
    return this.http.get(environment.BasePath + 'Stock/Get_Itemname_Typeahead/',  { params: Search_Data });
}



Save_Purchase_order(Purchase_Ordermaster_)
{
    debugger
    return this.http.post(environment.BasePath +'Sales_Master/Save_Purchase_order/',Purchase_Ordermaster_);
}



// Search_PurchaseOrder(look_In_Date_Value,From_Date,To_Date,Customer,orderNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_):Observable<any>
// {    
//     return this.http.get(environment.BasePath +'Sales_Master/Search_PurchaseOrder/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date+'/'+Customer+'/'+orderNo+'/'+partNo+'/'+Item_Group_Id_+'/'+CurrencyDetails_Id_+'/'+AccountType_Id_);
// }


Search_PurchaseOrder(look_In_Date_Value,From_Date,To_Date,Customer,orderNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,AccountType_Id_,
    User_Type, Login_User_Id
):Observable<any>
{
    // if(Item_Name==undefined)
    //     Item_Name="";  

    var Search_Data = { 
        'Is_Date_Check_': look_In_Date_Value,
        'From_Date_': From_Date,
        'To_Date_': To_Date,
        'Customer_': Customer,
        'orderNo_': orderNo,
        'partNo_': partNo,
        'Item_Group_Id_': Item_Group_Id_,
        'CurrencyDetails_Id_': CurrencyDetails_Id_,
        'AccountType_Id_': AccountType_Id_,
        'User_Type': User_Type,
        'Login_User_Id': Login_User_Id
    }
    return this.http.get(environment.BasePath + 'Sales_Master/Search_PurchaseOrder/',  { params: Search_Data });
}

/*** Added on 18-09-2024 */

Save_Delivery_Order(Delivery_Order_Master_)
{
    return this.http.post(environment.BasePath +'Sales_Master/Save_Delivery_Order/',Delivery_Order_Master_);
}


Get_PurchaseOrder_Details(Purchase_OrderMaster_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_PurchaseOrder_Details/'+Purchase_OrderMaster_Id);
}
// Search_Delivery_Order(look_In_Date_Value,From_Date,To_Date,Customer,QuotNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,Account_Type_Id_):Observable<any>
// {    
//     return this.http.get(environment.BasePath +'Sales_Master/Search_Delivery_Order/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date+'/'+Customer+'/'+QuotNo+'/'+partNo+'/'+Item_Group_Id_+'/'+CurrencyDetails_Id_+'/'+User_Details_Id_+'/'+Account_Type_Id_);
// }


Search_Delivery_Order(look_In_Date_Value,From_Date,To_Date,Customer,QuotNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,Account_Type_Id_,
    User_Type, Login_User_Id):Observable<any>
{
    // if(Item_Name==undefined)
    //     Item_Name="";  

    var Search_Data = { 
        'Is_Date_Check_': look_In_Date_Value,
        'From_Date_': From_Date,
        'To_Date_': To_Date,
        'Customer_': Customer,
        'QuotNo_': QuotNo,
        'partNo_': partNo,
        'Item_Group_Id_': Item_Group_Id_,
        'CurrencyDetails_Id_': CurrencyDetails_Id_,
        'User_Details_Id_': User_Details_Id_,
        'Account_Type_Id_': Account_Type_Id_,
        'User_Type':User_Type,
        'Login_User_Id':Login_User_Id
    }
    return this.http.get(environment.BasePath + 'Sales_Master/Search_Delivery_Order/',  { params: Search_Data });
}


Delete_Delivery_Order(DeliveryOrderMaster_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Delete_Delivery_Order/'+DeliveryOrderMaster_Id);
}



Delete_Purchase_Order(Purchase_OrderMaster_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Delete_Purchase_Order/'+Purchase_OrderMaster_Id);
}

Get_Purchase_Item_Code_Typeahead(Item_Code):Observable<any>
{
    // if (Item_Code.includes('+')) {
    //     // Perform the necessary action when '+' exists in Item_Code
    //     Item_Code = encodeURIComponent(Item_Code);
    //     console.log("'+' exists in Item_Code");
    //   }
    // var Search_Data = { 'Item_Code': Item_Code}

    if (Item_Code.includes('+')) {
        // Only encode if the '+' is present
        Item_Code = Item_Code.replace(/\+/g, '%2B');
        console.log("'+' exists in Item_Code, replaced with '%2B'.");
    }

    // Manually encode the entire Item_Code only if needed
    const Search_Data = { 'Item_Code': Item_Code };
    
    return this.http.get(environment.BasePath + 'Stock/Get_Purchase_Item_Code_Typeahead/',  { params: Search_Data });
}

Search_PurchaseItem_Typeahead(Item_Name):Observable<any>
{
    var Search_Data = { 'Item_Name': Item_Name}
    return this.http.get(environment.BasePath + 'Stock/Search_PurchaseItem_Typeahead/',  { params: Search_Data });
}

Search_Stock_Details_Item_Typeahead(Item_Name):Observable<any>
{
    var Search_Data = { 'Item_Name': Item_Name}
    return this.http.get(environment.BasePath + 'Stock/Search_Stock_Details_Item_Typeahead/',  { params: Search_Data });
}

Get_Delivery_Order_Details(DeliveryOrderMaster_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Delivery_Order_Details/'+DeliveryOrderMaster_Id);
}

Get_Performa_invoice_Details(PerformaInvoiceMaster_Id):Observable<any>
{
    debugger
    return this.http.get(environment.BasePath +'Sales_Master/Get_Performa_invoice_Details/'+PerformaInvoiceMaster_Id);
}

Save_PackingDetails(packinglist_master_)
{
    debugger
    return this.http.post(environment.BasePath +'Sales_Master/Save_PackingDetails/',packinglist_master_);
}

Search_PackingDEtails(look_In_Date_Value,From_Date,To_Date,QuotNo,partNo):Observable<any>
{    
    return this.http.get(environment.BasePath +'Sales_Master/Search_PackingDEtails/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date+'/'+QuotNo+'/'+partNo);
}

// Search_PackingDEtail(look_In_Date_Value,From_Date,To_Date,Customer,QuotNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_):Observable<any>
// {    
//     return this.http.get(environment.BasePath +'Sales_Master/Search_PackingDEtail/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date+'/'+Customer+'/'+QuotNo+'/'+partNo+'/'+Item_Group_Id_+'/'+CurrencyDetails_Id_+'/'+User_Details_Id_);
// }

Search_PackingDEtail(look_In_Date_Value,From_Date,To_Date,Customer,QuotNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,
    User_Type, Login_User_Id
):Observable<any>
{
    // if(Item_Name==undefined)
    //     Item_Name="";  


    var Search_Data = { 
        'Is_Date_Check_': look_In_Date_Value,
        'From_Date_': From_Date,
        'To_Date_': To_Date,
        'Customer_': Customer,
        'QuotNo_': QuotNo,
        'partNo_': partNo,
        'Item_Group_Id_': Item_Group_Id_,
        'CurrencyDetails_Id_': CurrencyDetails_Id_,
        'User_Details_Id_': User_Details_Id_,
        'User_Type': User_Type,
        'Login_User_Id' : Login_User_Id
    }
    return this.http.get(environment.BasePath + 'Sales_Master/Search_PackingDEtail/',  { params: Search_Data });
}

Get_Packing_Details(PackingList_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Packing_Details/'+PackingList_Master_Id);
}

Load_Profoma_Items_Pending_List_ByQuotation(SalesQuotationMaster_Id_):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Load_Profoma_Items_Pending_List_ByQuotation/'+SalesQuotationMaster_Id_);
}

Load_Invoice_Items_Pending_List_ByQuotation(SalesQuotationMaster_Id_):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Load_Invoice_Items_Pending_List_ByQuotation/'+SalesQuotationMaster_Id_);
}

Load_Delivery_Items_Pending_List_ByQuotation(SalesQuotationMaster_Id_):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Load_Delivery_Items_Pending_List_ByQuotation/'+SalesQuotationMaster_Id_);
}

Load_Purchase_Items_Pending_List_ByQuotation(SalesQuotationMaster_Id_):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Load_Purchase_Items_Pending_List_ByQuotation/'+SalesQuotationMaster_Id_);
}

Delete_Packing_Master(PackingList_Master_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Delete_Packing_Master/'+PackingList_Master_Id);
}

Save_Sales_Returns_Master(Sales_Return_Master_)
{
    return this.http.post(environment.BasePath +'Sales_Master/Save_Sales_Returns_Master/',Sales_Return_Master_);
}


Search_SaleInvoiceNo_Typeahead(Client_Id,Item_Name):Observable<any>
{
    if(Item_Name==undefined)
    Item_Name="";
    return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);
}
Search_purchase_return_master(
    look_In_Date_Value,
    From_Date,
    To_Date,
    InvoiceNo,
    Customer,
    AccountType_Id_,
    CurrencyDetails_Id_,
    User_Details_Id_,
    partNo,
    Item_Group_Id_
):Observable<any>
{ 
    debugger
    var Search_Data = { 
        'Is_Date_Check': look_In_Date_Value,
        'FromDate':From_Date,
        'ToDate':To_Date,
        'InvoiceNo':InvoiceNo,
        'Customer':Customer,
        'AccountType_Id_':AccountType_Id_,
        'CurrencyDetails_Id_':CurrencyDetails_Id_,
        'User_Details_Id_':User_Details_Id_,
        'partNo':partNo,
        'Item_Group_Id_':Item_Group_Id_
    }
    return this.http.get(environment.BasePath + 'purchase_return_master/Search_purchase_return_master/',  { params: Search_Data });
}


// Search_SalesReturn_Master(
//     look_In_Date_Value,
//     From_Date,
//     To_Date,
//     Customer,
//     QuotNo,
//     partNo,
//     Item_Group_Id_,
//     CurrencyDetails_Id_,
//     AccountType_Id_,
//     User_Details_Id_):Observable<any>
// {    
//     return this.http.get(environment.BasePath +'Sales_Master/Search_SalesReturn_Master/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date+'/'+Customer+'/'+QuotNo+'/'+partNo+'/'+Item_Group_Id_+'/'+CurrencyDetails_Id_+'/'+AccountType_Id_+'/'+User_Details_Id_);
// }User_Details_Id_'User_Details_Id_':User_Details_Id_,


Search_SalesReturn_Master(
    look_In_Date_Value,
    From_Date,
    To_Date,
    Customer,
    QuotNo,
    partNo,
    Item_Group_Id_,
    CurrencyDetails_Id_,
    AccountType_Id_,    
    User_Type,
    Login_User_Id
):Observable<any>
{ 
    debugger
    var Search_Data = { 
        'Is_Date_Check': look_In_Date_Value,
        'FromDate':From_Date,
        'ToDate':To_Date,
        'Customer':Customer,
        'QuotNo':QuotNo,
        'partNo':partNo,
        'Item_Group_Id_':Item_Group_Id_,
        'CurrencyDetails_Id_':CurrencyDetails_Id_,
        'AccountType_Id_':AccountType_Id_,        
        'User_Type':User_Type,
        'Login_User_Id':Login_User_Id

    }
    return this.http.get(environment.BasePath + 'sales_return_master/Search_SalesReturn_Master/',  { params: Search_Data });
}

Get_SalesReturn_Details(Sales_Return_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_SalesReturn_Details/'+Sales_Return_Master_Id);
}


Delete_SalesReturn_Master(Sales_Return_Master_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Delete_SalesReturn_Master/'+Sales_Return_Master_Id);
}


Save_AddStock(Stock_Add_Master_)
{
    return this.http.post(environment.BasePath +'Sales_Master/Save_AddStock/',Stock_Add_Master_);
}

Search_Stock(look_In_Date_Value,From_Date,To_Date,User_Type,Login_User_Id):Observable<any>
{    
    debugger
    return this.http.get(environment.BasePath +'Sales_Master/Search_AddStock/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date+'/'+User_Type+'/'+Login_User_Id);
}



Get_AddStock_Details(Stock_Add_Master_Id):Observable<any>
{
    debugger
    return this.http.get(environment.BasePath +'Sales_Master/Get_AddStock_Details/'+Stock_Add_Master_Id);
}


Delete_AddStock_Master(Stock_Add_Master_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Delete_AddStock_Master/'+Stock_Add_Master_Id);
}


Load_GRn_Pending_List_ByPurchaseOrder(Purchase_OrderMaster_Id_):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Load_GRn_Pending_List_ByPurchaseOrder/'+Purchase_OrderMaster_Id_);
}


Search_GRN_Order(look_In_Date_Value,From_Date,To_Date,Customer,QuotNo,partNo,Item_Group_Id_,CurrencyDetails_Id_,User_Details_Id_,Account_Type_Id_):Observable<any>
{    
    return this.http.get(environment.BasePath +'Sales_Master/Search_GRN_Order/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date+'/'+Customer+'/'+QuotNo+'/'+partNo+'/'+Item_Group_Id_+'/'+CurrencyDetails_Id_+'/'+User_Details_Id_+'/'+Account_Type_Id_);
}

/*** Added on 14-10-2024 ***/

Load_Delivery_Order_Master(DeliveryOrderMaster_Id)
{
 return this.http.get(environment.BasePath +'Sales_Master/Load_Delivery_Order_Master/'+DeliveryOrderMaster_Id);
}

/*** Added on 15-10-2024 */

Load_SalesQuotationMaster(SalesQuotationMaster_Id)
{
 return this.http.get(environment.BasePath +'Sales_Master/Load_SalesQuotationMaster/'+SalesQuotationMaster_Id);
}

Load_Price_Request_Master(Price_Request_Master_Id)
{
 return this.http.get(environment.BasePath +'Sales_Master/Load_Price_Request_Master/'+Price_Request_Master_Id);
}

/** Added on 16-10-2024 */

Get_Proforma_Quotation_Details(SalesQuotationMaster_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Proforma_Quotation_Details/'+SalesQuotationMaster_Id); 
}



Load_PerformaInvoiceMaster(PerformaInvoiceMaster_Id)
{
 return this.http.get(environment.BasePath +'Sales_Master/Load_PerformaInvoiceMaster/'+PerformaInvoiceMaster_Id);
}

/*** Added on 17-10-2024 */

Get_Salesmaster_Quotation_Details(SalesQuotationMaster_Id_Edit)
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Salesmaster_Quotation_Details/'+SalesQuotationMaster_Id_Edit); 
}

Load_SalesMaster(Sales_Master_Id)
{
 return this.http.get(environment.BasePath +'Sales_Master/Load_SalesMaster/'+Sales_Master_Id);
}




Get_Proforma_InvoiceClick_Details(PerformaInvoiceMaster_Id_Edit)
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Proforma_InvoiceClick_Details/'+PerformaInvoiceMaster_Id_Edit); 
}




Get_Proforma_DOClick_Details(PerformaInvoiceMaster_Id_Edit)
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Proforma_DOClick_Details/'+PerformaInvoiceMaster_Id_Edit); 
}
Get_DeliveryOrder_Quotation_Details(SalesQuotationMaster_Id_Edit)
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_DeliveryOrder_Quotation_Details/'+SalesQuotationMaster_Id_Edit); 
}

Get_PurchaseOrder_Quotation_Details(SalesQuotationMaster_Id_Edit)
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_PurchaseOrder_Quotation_Details/'+SalesQuotationMaster_Id_Edit); 
}



Get_Purchase_order_GRNClick_Details(Purchase_OrderMaster_Id_Edit)
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Purchase_order_GRNClick_Details/'+Purchase_OrderMaster_Id_Edit); 
}

Get_PackingList_Quotation_Details(SalesQuotationMaster_Id_Edit)
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_PackingList_Quotation_Details/'+SalesQuotationMaster_Id_Edit); 
}

/*** Added on 19-10-2024 */

Load_PackingList_Items_Pending_List_ByQuotation(SalesQuotationMaster_Id_):Observable<any>
{
    return this.http.get(environment.BasePath +'Sales_Master/Load_PackingList_Items_Pending_List_ByQuotation/'+SalesQuotationMaster_Id_);
}

/*** Added on 23-10-2024 */

Get_Delivery_Salesmaster(DeliveryOrderMaster_Id)
{
    return this.http.get(environment.BasePath +'Sales_Master/Get_Delivery_Salesmaster/'+DeliveryOrderMaster_Id); 
}

/*** Added on 24-10-2024 */

Load_Vat_Percentage():Observable<any>
{ 
    return this.http.get(environment.BasePath +'Sales_Master/Load_Vat_Percentage/');
}

/** Added on 26-10-2024 */

Search_SaleInvoice_By_Supplier_Typeahead(Client_Accounts_Id_,InvoiceNo_)
{
 return this.http.get(environment.BasePath +'sales_return_master/Search_SaleInvoice_By_Supplier_Typeahead/'+Client_Accounts_Id_+'/'+InvoiceNo_);}


 /*** Added on 28-10-2024 */

 Get_Item_Code_Typeahead_For_Purchase_Return(Item_Code_, Purchase_Master_Id_)
{
 return this.http.get(environment.BasePath +'Sales_Master/Get_Item_Code_Typeahead_For_Purchase_Return/'+ Purchase_Master_Id_  +'/'+ Item_Code_);}

 /*** */

 Get_Item_Name_Typeahead_For_Purchase_Return(Purchase_Master_Id_,Item_Name_ )
 {
    debugger;
    const postData = 
    {
        Purchase_Master_Id_: Purchase_Master_Id_,
        Item_Name_: Item_Name_
       
    };
  return this.http.post(environment.BasePath +'Sales_Master/Get_Item_Name_Typeahead_For_Purchase_Return/',postData);}

  /*** */

  Get_Item_Code_Typeahead_For_Sales_Return(Sales_Master_Id_,Item_Code_ )
  {
   return this.http.get(environment.BasePath +'Sales_Master/Get_Item_Code_Typeahead_For_Sales_Return/'+Sales_Master_Id_+'/'+Item_Code_);}

   /*** */

   Get_Item_Name_Typeahead_For_Sales_Return(Sales_Master_Id_,Item_Name_ )
   {

    debugger;
    const postData = 
    {
        Sales_Master_Id_: Sales_Master_Id_,
        Item_Name_: Item_Name_
       
    };
    return this.http.post(environment.BasePath +'Sales_Master/Get_Item_Name_Typeahead_For_Sales_Return',postData);}

    Print_Quotation(Sales_Master_Id): Observable<Blob> {
        return this.http.get(environment.BasePath + 'Sales_Master/Print_Quotation/' + Sales_Master_Id, {
            responseType: 'blob'
        });
    }

    Print_Quotation_JSON(master: any, details: any[]): Observable<Blob> {
        return this.http.post(environment.BasePath + 'Sales_Master/Print_Quotation_JSON', { master, details }, {
            responseType: 'blob'
        });
    }

    /*** */

}
