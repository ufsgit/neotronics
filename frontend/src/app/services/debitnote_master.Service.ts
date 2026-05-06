import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class debitnote_master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_debitnote_master(debitnote_master_)
{
return this.http.post(environment.BasePath +'debitnote_master/Save_debitnote_master/',debitnote_master_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_debitnote_master(
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
        'Login_User_Id':Login_User_Id,

    }
    return this.http.get(environment.BasePath + 'debitnote_master/Search_debitnote_master/',  { params: Search_Data });
}
Delete_debitnote_master(debitnote_master_Id)
{
 return this.http.get(environment.BasePath +'debitnote_master/Delete_debitnote_master/'+debitnote_master_Id);}
Get_debitnote_master(debitnote_master_Id)
{
 return this.http.get(environment.BasePath +'debitnote_master/Get_debitnote_master/'+debitnote_master_Id);}
 Search_Customer_Typeahead(Client_Id,Item_Name):Observable<any>
{
    if(Item_Name==undefined)
    Item_Name="";
    return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);
}
Get_Stock_Item_Code_Typeahead(Item_Code):Observable<any>
{
    var Search_Data = { 'Item_Code': Item_Code}
    return this.http.get(environment.BasePath + 'Stock/Get_Stock_Item_Code_Typeahead/',  { params: Search_Data });
}
Search_Item_Typeahead(Item_Name):Observable<any>
{
    var Search_Data = { 'Item_Name': Item_Name}
    return this.http.get(environment.BasePath + 'Stock/Get_Stock_Item_Typeahead/',  { params: Search_Data });
}
Get_debitnote_details(DebitNote_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'debitnote_master/Get_debitnote_details/'+DebitNote_Master_Id);
}
}

