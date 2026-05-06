import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { S3 } from 'aws-sdk';
@Injectable({
providedIn: 'root'
})
export class Purchase_Master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
private extractData(res: Response)
{
let body = res;
return body || { };
}
fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
fileExtension = '.xlsx';
public exportExcel(jsonData: any[], fileName: string): void 
{
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
  const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  this.saveExcelFile(excelBuffer, fileName);
}
private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
  FileSaver.saveAs(data, fileName + this.fileExtension);
}
Load_Bill_Type(Group_Id):Observable<any>
{ 
 return this.http.get(environment.BasePath +'Sales_Master/Get_Bill_Type/'+ Group_Id);
}
Search_Supplier_Typeahead(Client_Id,Item_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);}

 Get_Purchase_Item_Typeahead(Item_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Purchase_Master/Get_Purchase_Item_Typeahead/'+Item_Name);
}
Get_Purchase_Typeahead(Item_Name):Observable<any>
{
    return this.http.get(environment.BasePath +'Purchase_Master/Get_Purchase_Typeahead/'+Item_Name);
}
Get_Barcode_Purchase(Barcode):Observable<any>
 {
  return this.http.get(environment.BasePath +'Purchase_Master/Get_Barcode_Purchase/'+Barcode);
 }
Search_Purchase_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No): Observable<any> 
{
    var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
        'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No }
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Purchase_Report/', { params: Search_Data });
}
Search_Purchase_Return_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No): Observable<any> 
{
    var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
        'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No }
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Purchase_Return_Report/', { params: Search_Data });
}
Load_Purchase_SaleTax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Purchase_SaleTax_Report/', { params: Search_Data });
}  
Load_Hsn_Purchase_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Hsn_Purchase_Report/', { params: Search_Data });
}
Load_Hsn_Purchase_Return_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Hsn_Purchase_Return_Report/', { params: Search_Data });
}
Load_Hsn_Service_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Hsn_Service_Report/', { params: Search_Data });
}
Load_Service_Tax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Service_Tax_Report/', { params: Search_Data });
}
Load_Purchase_Return_Tax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Purchase_Return_Tax_Report/', { params: Search_Data });
}
Search_Purchase_Details_Report(look_In_Date_Value, Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No, Item_Id): Observable<any> {

var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
    'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No,'Item_Id':Item_Id}
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Purchase_Details_Report/', { params: Search_Data });
}

Search_Purchaseorder_Details_Report(look_In_Date_Value, Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No, Item_Id): Observable<any> {

    var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
        'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No,'Item_Id':Item_Id}
        return this.http.get(environment.BasePath + 'Purchase_Master/Search_Purchaseorder_Details_Report/', { params: Search_Data });
    }




Search_Purchase_Return_Details_Report(look_In_Date_Value, Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No, Item_Id): Observable<any> {

var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
    'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No,'Item_Id':Item_Id}
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Purchase_Return_Details_Report/', { params: Search_Data });
}

 Search_To_Stock_Typeahead(Client_Id,Item_Name):Observable<any>
 {
  return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);
 }
// Save_Purchase_Master(Purchase_Master_)
// {
// return this.http.post(environment.BasePath +'Purchase_Master/Save_Purchase_Master/',Purchase_Master_);
// }
Save_Purchase_Master(Purchase_Master_ 
    // Doc_Photo: File[],
    // ImageFile_Doc: File[],
    // Document_File_Array: any[]
) {
//    const postData = new FormData();
debugger;
   const postData = 
   {
      Purchase_Master_Id: Purchase_Master_.Purchase_Master_Id,
      Account_Party_Id: Purchase_Master_.Account_Party_Id,
      PurchaseDate: Purchase_Master_.PurchaseDate,
      Additional_Discount: Purchase_Master_.Additional_Discount,
      Amount_In_Words: Purchase_Master_.Amount_In_Words,
      Brand: Purchase_Master_.Brand,
      Charge1: Purchase_Master_.Charge1,
      Charge2: Purchase_Master_.Charge2,
      Conversion: Purchase_Master_.Conversion,
      Currency_Id: Purchase_Master_.Currency_Id,
      Discount_Description: Purchase_Master_.Discount_Description,
      InvoiceNo: Purchase_Master_.InvoiceNo,
      NetTotal: Purchase_Master_.NetTotal,
      PaymentTerms: Purchase_Master_.PaymentTerms,
      Payment_Term_Description: Purchase_Master_.Payment_Term_Description,
      Ponumber: Purchase_Master_.Ponumber,
      PriceBasis: Purchase_Master_.PriceBasis,
      TotalDiscount: Purchase_Master_.TotalDiscount,
      TypeId: Purchase_Master_.TypeId,
      Purchase_Details:  JSON.stringify(Purchase_Master_.Purchase_Details),
      User_Id: Purchase_Master_.User_Id,
      VAT_Amount: Purchase_Master_.VAT_Amount,
      VAT_Description: Purchase_Master_.VAT_Description,
      VAT_Percentage: Purchase_Master_.VAT_Percentage,
      charge1_Amount: Purchase_Master_.charge1_Amount,
      charge2_Amount: Purchase_Master_.charge2_Amount,
      PurchaseOrderMaster_Id : Purchase_Master_.PurchaseOrderMaster_Id,
      TotalAmount:Purchase_Master_.TotalAmount,
      TaxableAmount:Purchase_Master_.TaxableAmount,
      PaymentTermValue:Purchase_Master_.PaymentTermValue,
      Supplier_Ref_No:Purchase_Master_.Supplier_Ref_No,
      Roundoff:Purchase_Master_.Roundoff,


   };

debugger;       
    //    postData.append("Purchase_Master_Id", Purchase_Master_.Purchase_Master_Id);
    //    postData.append("Account_Party_Id", Purchase_Master_.Account_Party_Id);
    //    postData.append("Entry_Date", Purchase_Master_.Entry_Date);
    //    postData.append("PurchaseDate", Purchase_Master_.PurchaseDate);
    //    postData.append("InvoiceNo", Purchase_Master_.InvoiceNo);
    //    postData.append("Discount", Purchase_Master_.Discount);
    //    postData.append("Roundoff", Purchase_Master_.Roundoff);
    //    postData.append("TotalAmount", Purchase_Master_.TotalAmount);
    //    postData.append("TotalDiscount",Purchase_Master_.TotalDiscount);
    //    postData.append("TaxableAmount",Purchase_Master_.TaxableAmount);   
    //    postData.append("TotalCGST",Purchase_Master_.TotalCGST);
    //    postData.append("TotalSGST",Purchase_Master_.TotalSGST);
    //   postData.append("User_Id",Purchase_Master_.User_Id);
    //    postData.append("Other_Charges",Purchase_Master_.Other_Charges);
    //    postData.append("GrossTotal",Purchase_Master_.GrossTotal);
    //    postData.append("NetTotal",Purchase_Master_.NetTotal);
    //    postData.append("BillType",Purchase_Master_.BillType);
  
    //    postData.append("Description",Purchase_Master_.Description);
    //    postData.append("Purchase_Details", JSON.stringify(Purchase_Master_.Purchase_Details));
    //    postData.append("Document_Name",Purchase_Master_.Document_Name);
    //    postData.append("Item_Group_Id",Purchase_Master_.Item_Group_Id);
    //    postData.append("Item_Group_Name",Purchase_Master_.Item_Group_Name);
   var i = 0; 
   

    // if (ImageFile_Doc != undefined) {
    //     for (const img of ImageFile_Doc) {
    //         postData.append("myFile", img);
    //         postData.append("ImageFile_Doc", i.toString());
    //         i = i + 1;
    //     }
    //     debugger;
    // }
// debugger;
//     postData.append("Document_File_Array", i.toString());
//     if (Document_File_Array != undefined) {
//         var j = 0;
//         for (const img of Document_File_Array) {
//             if (Document_File_Array[j].New_Entry == 1) {
//                 postData.append("myFile", img);
//             }
//             j++;
//             i = i + 1;
//         }
//         debugger;
//     }       
 
// debugger;
   return this.http.post(environment.BasePath + 'Purchase_Master/Save_Purchase_Master', postData);
}


Save_Purchaseorder_Master(Purchaseorder_Master_)
{
return this.http.post(environment.BasePath +'Purchase_Master/Save_Purchaseorder_Master/',Purchaseorder_Master_);
}




Search_Purchase_Master(
    look_In_Date_Value,
    From_Date,
    To_Date,
    InvoiceNo,
    Customer,
    AccountType_Id_,
    CurrencyDetails_Id_,
    User_Details_Id_,
    partNo,
    Item_Group_Id_,
    User_Type,
    Login_User_Id
    ):Observable<any>
{ 
    debugger;
    var Search_Data = { 
        'look_In_Date_Value': look_In_Date_Value,
        'From_Date':From_Date,
        'To_Date':To_Date,
        'Customer':Customer,
        'InvoiceNo':InvoiceNo,
        'User_Details_Id_':User_Details_Id_,
        'partNo':partNo,
        'Item_Group_Id_':Item_Group_Id_,
        'CurrencyDetails_Id_':CurrencyDetails_Id_,
        'AccountType_Id_':AccountType_Id_,
        'User_Type': User_Type,
        'Login_User_Id': Login_User_Id
      }
      debugger
return this.http.get(environment.BasePath + 'Purchase_Master/Search_Purchase_Master/',  { params: Search_Data });
    
}


Search_Purchaseorder_Master(Look_In_Date,Search_FromDate,Search_ToDate,ClientAccount,Voucher_No_search_):Observable<any>
{ 
 return this.http.get(environment.BasePath +'Purchase_Master/Search_Purchaseorder_Master/'+Look_In_Date+'/'+Search_FromDate+'/'+Search_ToDate+'/'+ClientAccount+'/'+Voucher_No_search_);
}


Delete_Purchase_Master(Purchase_Master_Id)
{
 return this.http.get(environment.BasePath +'Purchase_Master/Delete_Purchase_Master/'+Purchase_Master_Id);
}

Delete_Purchaseorder_Master(Purchase_OrderMaster_Id)
{
 return this.http.get(environment.BasePath +'Purchase_Master/Delete_Purchaseorder_Master/'+Purchase_OrderMaster_Id);
}



Get_Purchase_Master(Purchase_Master_Id)
{
 return this.http.get(environment.BasePath +'Purchase_Master/Get_Purchase_Master/'+Purchase_Master_Id);
}
Get_Purchase_Details(Purchase_Master_Id)
{
 return this.http.get(environment.BasePath +'Purchase_Master/Get_Purchase_Details/'+Purchase_Master_Id);
}
    Search_Service_Type_Typeahead(Service_Type_Name_)
{
        var search_data = { 'Service_Type_Name_': Service_Type_Name_}
        return this.http.get(environment.BasePath + 'Purchase_Master/Search_Service_Type_Typeahead/', { params:search_data});
}

Save_Service(Service_)
{
    return this.http.post(environment.BasePath +'Purchase_Master/Save_Service/',Service_);
}
Search_Service(Look_In_Date,Search_FromDate,Search_ToDate,ClientAccount,Voucher_No_search_):Observable<any>
{
    var search_data = {  'Is_Date_Check_': Look_In_Date, 'FromDate_': Search_FromDate, 'ToDate_': Search_ToDate,
        'Account_Party_Id_': ClientAccount, 'InvoiceNo_': Voucher_No_search_ }
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Service/', { params: search_data });
}
Search_Service_Details_Report(Look_In_Date, Search_FromDate, Search_ToDate, ClientAccount, Voucher_No_search_, Service_Type_Id):Observable<any>
{
    
    var search_data = {  'Is_Date_Check_': Look_In_Date, 'FromDate_': Search_FromDate, 'ToDate_': Search_ToDate,
        'Account_Party_Id_': ClientAccount, 'InvoiceNo_': Voucher_No_search_, 'Service_Type_Id': Service_Type_Id }
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Service_Details_Report/', { params: search_data });
}
Delete_Service(Service_Id)
{
    return this.http.get(environment.BasePath +'Purchase_Master/Delete_Service/'+Service_Id);
}
Get_Service(Service_Id)
{
    return this.http.get(environment.BasePath +'Purchase_Master/Get_Service/'+Service_Id);
}

/*** Added on 23-02-2024 */
Get_Item_Name_With_Code(Item_Code,Item_Group_Id):Observable<any>
{
    debugger;
    return this.http.get(environment.BasePath +'Purchase_Master/Get_Item_Name_Get_With_Code/'+Item_Code+'/'+Item_Group_Id);
    debugger;
}


Search_Branch_Typeahead(Branch_Name): Observable<any> {
    debugger;
    return this.http.get(
      environment.BasePath +
        "Client_Accounts/Search_Branch_Typeahead/" +
        Branch_Name
    );
  }
  

  Search_ItemCode_Typeahead(Item_Code): Observable<any> {
    debugger;
    return this.http.get(
      environment.BasePath +
        "Client_Accounts/Search_ItemCode_Typeahead/" +
        Item_Code
    );
  }


  Search_ItemName_Typeahead(Item_Name): Observable<any> {
    debugger;
    return this.http.get(
      environment.BasePath +
        "Client_Accounts/Search_ItemName_Typeahead/" +
        Item_Name
    );
  }

  	/*** Added on 08-05-2024 ***/

uploadFile(file){
	debugger;
	return new Promise((resolve, reject) => {
		const contentType = file.type;
		const currentDate = new Date();
const formattedDate = currentDate.toISOString().replace(/[-:.TZ]/g, "").replace("T", "");
console.log(formattedDate);
const key = `https://ufsnabeelphotoalbum.s3.us-east-2.amazonaws.com/abhrami/${formattedDate}_${file.name}`;
  
		const bucket = new S3({
		  accessKeyId: environment.aws.accessKeyId,
		  secretAccessKey: environment.aws.secretAccessKey,
		  region: environment.aws.region,
		});
  
		const params = {
		  Bucket: environment.aws.bucket,
		  Key: key,
		  Body: file,
		  ACL: "public-read",
		  ContentType: contentType,
		};
  
		bucket.upload(params, function (err, data) {
		  if (err) {
			console.log("There was an error uploading your file: ", err);
			reject(err);
		  } else {
			console.log("Successfully uploaded file.", data);
			resolve(data);
		  }
		});
	  });
}

/*** Added on 22-08-2024 */

Search_Purchase_Master_Report(Look_In_Date, Search_FromDate, Search_ToDate, Voucher_No_search_, Branch_Id):Observable<any>
{ 
    debugger 
 return this.http.get(environment.BasePath +'Purchase_Master/Search_Purchase_Master_Report/'+ Look_In_Date +'/'+ Search_FromDate +'/'+ Search_ToDate +'/'+ Voucher_No_search_ +'/'+ Branch_Id);
}


Get_Purchase_Details_Report(Purchase_Master_Id)
{
    return this.http.get(environment.BasePath +'Purchase_Master/Get_Purchase_Details_Report/'+Purchase_Master_Id);
}


/*** Added on 23-09-2024 */

Save_CreditNote_Master_1(creditnote_master_) 
{
   const postData = 
   {
      CreditNote_Master_Id: creditnote_master_.CreditNote_Master_Id,
      Account_Party_Id: creditnote_master_.Account_Party_Id,
      EntryDate: creditnote_master_.EntryDate,
      Additional_Discount: creditnote_master_.Additional_Discount,
      Amount_In_Words: creditnote_master_.Amount_In_Words,
      Makes: creditnote_master_.Makes,
      Charge1: creditnote_master_.Charge1,
      Charge2: creditnote_master_.Charge2,
      CurrencyId: creditnote_master_.CurrencyId,
      CurrecnyName: creditnote_master_.CurrecnyName,
      Discount_Description: creditnote_master_.Discount_Description,
      InvNo: creditnote_master_.InvNo,
      NetTotal: creditnote_master_.NetTotal,
      PaymentTerms: creditnote_master_.PaymentTerms,
      Payment_Term_Description: creditnote_master_.Payment_Term_Description,
      LPONo: creditnote_master_.LPONo,
      PriceBasis: creditnote_master_.PriceBasis,
      TotalDiscount: creditnote_master_.TotalDiscount,
      TypeId: creditnote_master_.TypeId,
      User_Id: creditnote_master_.User_Id,
      VAT_Amount: creditnote_master_.VAT_Amount,
      VAT_Description: creditnote_master_.VAT_Description,
      VAT_Percentage: creditnote_master_.VAT_Percentage,
      charge1_Amount: creditnote_master_.charge1_Amount,
      charge2_Amount: creditnote_master_.charge2_Amount,
      payment_Term_Value: creditnote_master_.payment_Term_Value,
      Credit_Note_Details:  JSON.stringify(creditnote_master_.Credit_Note_Details),


   };

debugger;       
    
   var i = 0; 
   


   return this.http.post(environment.BasePath + 'Purchase_Master/Save_CreditNote_Master_1', postData);
}

Search_CreditNote(
    look_In_Date_Value_,
    From_Date_,
    To_Date_,
    InvoiceNo_,
    partNo_,
    Item_Group_Id_,
    CurrencyDetails_Id_,
    Customer,
    AccountType_Id_,
    User_Type,
    Login_User_Id
):Observable<any>
{ 

    var Search_Data = 
    { 
        'Is_Date_Check_': look_In_Date_Value_, 
        'FromDate_': From_Date_, 
        'ToDate_': To_Date_,
        'InvoiceNo_': InvoiceNo_, 
        'partNo_': partNo_,
         'Item_Group_Id_': Item_Group_Id_,
         'CurrencyDetails_Id_':CurrencyDetails_Id_,
         'Customer_':Customer,
         'AccountType_Id_':AccountType_Id_,
         'User_Type':User_Type,
         'Login_User_Id':Login_User_Id

    }
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_CreditNote/', { params: Search_Data });

}

Delete_CreditNote(CreditNote_Master_Id)
{
 return this.http.get(environment.BasePath +'Purchase_Master/Delete_CreditNote/'+CreditNote_Master_Id);
}

Get_CreditNote_Details_1(CreditNote_Master_Id_)
{
 return this.http.get(environment.BasePath +'Purchase_Master/Get_CreditNote_Details_1/'+CreditNote_Master_Id_);
}

Get_salesGRNmaster(GRNId)
{
 return this.http.get(environment.BasePath +'salesquotationmaster/Get_salesGRNmaster/'+GRNId);}

 loadGRN(GRNId1)
{debugger;
 return this.http.get(environment.BasePath +'Purchase_Master/loadGRN/'+GRNId1);}

}

