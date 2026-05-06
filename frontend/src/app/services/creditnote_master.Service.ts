import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class creditnote_master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_creditnote_master(creditnote_master_)
{
return this.http.post(environment.BasePath +'creditnote_master/Save_creditnote_master/',creditnote_master_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}


Get_creditnote_master(creditnote_master_Id)
{
 return this.http.get(environment.BasePath +'creditnote_master/Get_creditnote_master/'+creditnote_master_Id);}


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
   


   return this.http.post(environment.BasePath + 'creditnote_master/Save_CreditNote_Master_1', postData);
}

Search_creditnote_master(
    look_In_Date_Value_,
    From_Date_,
    To_Date_,
    Customer,
    InvoiceNo_,
    partNo_,
    Search_Item_Group_Id_,
    CurrencyDetails_Id_,   
    AccountType_Id_,
    User_Details_Id_,
    User_Type,
    Login_User_Id
):Observable<any>
{ 
    debugger;
    if(Search_Item_Group_Id_==undefined)
        Search_Item_Group_Id_=0;

    var Search_Data = 
    { 
        'Is_Date_Check_': look_In_Date_Value_, 
        'FromDate_': From_Date_, 
        'ToDate_': To_Date_,
        'InvoiceNo_': InvoiceNo_, 
        'partNo_': partNo_,
         'Search_Item_Group_Id_': Search_Item_Group_Id_,
         'CurrencyDetails_Id_':CurrencyDetails_Id_,
         'Customer_':Customer,
         'AccountType_Id_':AccountType_Id_,
         'User_Details_Id_':User_Details_Id_,
         'User_Type':User_Type,
         'Login_User_Id':Login_User_Id

    }
    return this.http.get(environment.BasePath + 'creditnote_master/Search_creditnote_master/', { params: Search_Data });

}
Search_Item_Typeahead(Item_Name):Observable<any>
{
    var Search_Data = { 'Item_Name': Item_Name}
    return this.http.get(environment.BasePath + 'Stock/Get_Stock_Item_Typeahead/',  { params: Search_Data });
}
Get_Stock_Item_Code_Typeahead(Item_Code):Observable<any>
{
    var Search_Data = { 'Item_Code': Item_Code}
    return this.http.get(environment.BasePath + 'Stock/Get_Stock_Item_Code_Typeahead/',  { params: Search_Data });
}

Delete_CreditNote(CreditNote_Master_Id)
{
 return this.http.get(environment.BasePath +'creditnote_master/Delete_CreditNote/'+CreditNote_Master_Id);
}

Get_creditnote_details(CreditNote_Master_Id_)
{
 return this.http.get(environment.BasePath +'creditnote_master/Get_creditnote_details/'+CreditNote_Master_Id_);
}


}

