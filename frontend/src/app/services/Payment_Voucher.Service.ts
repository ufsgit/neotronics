import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, timeout } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Payment_Voucher_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Payment_Voucher(Payment_Voucher_)
{
return this.http.post(environment.BasePath +'Payment_Voucher/Save_Payment_Voucher/',Payment_Voucher_).pipe(timeout(60000));}
private extractData(res: Response)
{
let body = res;
return body || { };
}



Search_Payment_Voucher(Search_FromDate, Search_ToDate, ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value,CurrencyId,
     Login_User, User_Type
): Observable<any> {
     debugger
    return this.http.get(environment.BasePath + 'Payment_Voucher/Search_Payment_Voucher/'
     + Search_FromDate + '/' + Search_ToDate +  '/' 
     + ClientAccounts_Id + '/' + Voucher_No_search_  + '/' 
     + look_In_Date_Value  + '/' + CurrencyId + '/' 
     + Login_User + '/' + User_Type);
}
 Get_Payment_Mode():Observable<any>
{
 return this.http.get(environment.BasePath +'Payment_Voucher/Get_Payment_Mode/');}
Delete_Payment_Voucher(Payment_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Payment_Voucher/Delete_Payment_Voucher/'+Payment_Voucher_Id);}
Get_Purchase_Payment(Payment_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Payment_Voucher/Get_Purchase_Payment/'+Payment_Voucher_Id);
}
SelectSettledBills(Account_Party_Id)
{
 return this.http.get(environment.BasePath +'Payment_Voucher/SelectSettledBills/'+Account_Party_Id);
}
Search_Invoice_By_VoucherType_Typeahead(Client_Accounts_Id_,InvoiceNo_,Voucher_Type_Id_)
{
 return this.http.get(environment.BasePath +'Payment_Voucher/Search_Invoice_By_VoucherType_Typeahead/'+Client_Accounts_Id_+'/'+InvoiceNo_+'/'+Voucher_Type_Id_);}
}

