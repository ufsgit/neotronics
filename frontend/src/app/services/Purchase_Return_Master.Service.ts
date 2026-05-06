import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class purchase_return_master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
// Save_purchase_return_master(purchase_return_master_)
// {
// return this.http.post(environment.BasePath +'purchase_return_master/Save_purchase_return_master/',purchase_return_master_);}
// private extractData(res: Response)
// {
// let body = res;
// return body || { };
// }

Save_purchase_return_master(purchase_return_master_     
) {
   const postData = 
   {
      Purchase_Return_Master_Id: purchase_return_master_.Purchase_Return_Master_Id,
      Purchase_Master_Id: purchase_return_master_.Purchase_Master_Id,
      Account_Party_Id: purchase_return_master_.Account_Party_Id,
      PurchaseDate: purchase_return_master_.PurchaseDate,
      Ponumber: purchase_return_master_.Ponumber,
      CurrencyId: purchase_return_master_.Currency_Id,
      CurrecnyName:purchase_return_master_.CurrecnyName,
      InvoiceNo: purchase_return_master_.InvoiceNo,
      Entry_Date:purchase_return_master_.Entry_Date,
      TypeId: purchase_return_master_.TypeId,  
      Conversion: purchase_return_master_.Conversion,
      Brand: purchase_return_master_.Brand,
      PriceBasis: purchase_return_master_.PriceBasis,
      PaymentTerms: purchase_return_master_.PaymentTerms,
      Payment_Term_Description: purchase_return_master_.Payment_Term_Description,
      PaymentTermValue:purchase_return_master_.PaymentTermValue,
      Charge1: purchase_return_master_.Charge1,
      Charge2: purchase_return_master_.Charge2,
      charge1_Amount: purchase_return_master_.charge1_Amount,
      charge2_Amount: purchase_return_master_.charge2_Amount,
      Discount_Description: purchase_return_master_.Discount_Description,
      Additional_Discount: purchase_return_master_.Additional_Discount,
      TotalDiscount: purchase_return_master_.TotalDiscount,
      Discount:purchase_return_master_.Discount,
      Basic_Discount:purchase_return_master_.Basic_Discount,
      TaxableAmount:purchase_return_master_.TaxableAmount,
      TotalAmount:purchase_return_master_.TotalAmount,
      VAT_Amount: purchase_return_master_.VAT_Amount,
      VAT_Description: purchase_return_master_.VAT_Description,
      VAT_Percentage: purchase_return_master_.VAT_Percentage, 
      Roundoff:purchase_return_master_.Roundoff,
      NetTotal: purchase_return_master_.NetTotal,
      User_Id: purchase_return_master_.User_Id,
      UserName:purchase_return_master_.UserName,
      Amount_In_Words: purchase_return_master_.Amount_In_Words,       
      Purchase_Return_Details:  JSON.stringify(purchase_return_master_.Purchase_Return_Details)
   };  

   return this.http.post(environment.BasePath + 'Purchase_Return_Master/Save_Purchase_Return_Master', postData);
}
// Search_purchase_return_master(purchase_return_master_Name,a,b,c,d):Observable<any>
// {
// var Search_Data={'purchase_return_master_Name':purchase_return_master_Name}
//  return this.http.get(environment.BasePath +'purchase_return_master/Search_purchase_return_master/',{params:Search_Data});}
Delete_purchase_return_master(purchase_return_master_Id)
{
 return this.http.get(environment.BasePath +'purchase_return_master/Delete_purchase_return_master/'+purchase_return_master_Id);}
Get_purchase_return_master(purchase_return_master_Id)
{
 return this.http.get(environment.BasePath +'purchase_return_master/Get_purchase_return_master/'+purchase_return_master_Id);}


 Search_Invoice_By_Supplier_Typeahead(Client_Accounts_Id_,InvoiceNo_)
{

    var Search_Data = { 
        'Client_Accounts_Id_': Client_Accounts_Id_,
        'InvoiceNo_':InvoiceNo_
    }
    return this.http.get(environment.BasePath + 'purchase_return_master/Search_Invoice_By_Supplier_Typeahead/',  { params: Search_Data });
}


 Get_PurchaseReturn_Item_Code_Typeahead(Purchase_Master_Id,Item_Code):Observable<any>
{
    var Search_Data = { 
        'Item_Code': Item_Code,
        'Purchase_Master_Id':Purchase_Master_Id
    }
    return this.http.get(environment.BasePath + 'purchase_return_master/Get_PurchaseReturn_Item_Code_Typeahead/',  { params: Search_Data });
}
Get_Purchase_Return_Details(purchase_return_master_Id)
{
 return this.http.get(environment.BasePath +'purchase_return_master/Get_purchase_return_details/'+purchase_return_master_Id);
}

Get_Purchase_Details(purchase_master_Id)
{
 return this.http.get(environment.BasePath +'Purchase_Master/Get_Purchase_Details/'+purchase_master_Id);
}


Search_purchase_return_master(
    look_In_Date_Value,
    From_Date,
    To_Date,
    InvoiceNo,
    Customer,
    AccountType_Id_,
    CurrencyDetails_Id_,
    partNo,
    Item_Group_Id_,
    User_Type,
    Login_User_Id
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
        'partNo':partNo,
        'Item_Group_Id_':Item_Group_Id_,
        'User_Type':User_Type,
        'Login_User_Id':Login_User_Id
    }
    return this.http.get(environment.BasePath + 'purchase_return_master/Search_purchase_return_master/',  { params: Search_Data });
}




}

