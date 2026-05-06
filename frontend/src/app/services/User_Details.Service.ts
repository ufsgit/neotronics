import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})
export class User_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}
Save_User_Details(User_Details_)
{
return this.http.post(environment.BasePath +'User_Details/Save_User_Details/',User_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_User_Details(User_Details_Name,User_Type,Login_User_Id):Observable<any>
{
     
 return this.http.get(environment.BasePath +'User_Details/Search_User_Details/'+User_Type +'/' + Login_User_Id +'/' + User_Details_Name);
}
Employee_Typeahead(Client_Id,Item_Name):Observable<any>
{ 
    if(Item_Name==undefined)
    Item_Name="";
 return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);}
Get_Users_Load_Data():Observable<any>
{
return this.http.get(environment.BasePath +'User_Details/Get_Users_Load_Data/');
}

Load_Company():Observable<any>
{
return this.http.get(environment.BasePath +'User_Details/Search_Company/');
}

Load_InvoiceType2():Observable<any>
{ debugger;
return this.http.get(environment.BasePath +'User_Details/Load_InvoiceType2/');
}

Delete_User_Details(User_Details_Id)
{
 return this.http.get(environment.BasePath +'User_Details/Delete_User_Details/'+User_Details_Id);}
 Get_User_Details_Edit(User_Details_Id)
{
 return this.http.get(environment.BasePath +'User_Details/Get_User_Details_Edit/'+User_Details_Id);
}


Load_InvoiceType(AccountType_Name):Observable<any>
{
     
 return this.http.get(environment.BasePath +'User_Details/Load_InvoiceType/'+AccountType_Name);
}


Search_SaleInvoiceNo_Typeahead(Account_Party_Id):Observable<any>
{
     
 return this.http.get(environment.BasePath +'User_Details/Search_SaleInvoiceNo_Typeahead/'+Account_Party_Id);
}


}