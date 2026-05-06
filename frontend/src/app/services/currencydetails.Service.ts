import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class currencydetails_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_currencydetails(currencydetails_)
{
return this.http.post(environment.BasePath +'currencydetails/Save_currencydetails/',currencydetails_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_currencydetails(currencydetails_Name):Observable<any>
{
var Search_Data={'currencydetails_Name':currencydetails_Name}
 return this.http.get(environment.BasePath +'currencydetails/Search_currencydetails/',{params:Search_Data});}

 Load_currencydetails():Observable<any>
{ 
    return this.http.get(environment.BasePath +'Sales_Master/Load_currencydetails/');
}

Delete_currencydetails(currencydetails_Id)
{
 return this.http.get(environment.BasePath +'currencydetails/Delete_currencydetails/'+currencydetails_Id);}
Get_currencydetails(currencydetails_Id)
{
 return this.http.get(environment.BasePath +'currencydetails/Get_currencydetails/'+currencydetails_Id);}

 Load_All_Account_Type(currencydetails_Name):Observable<any>
{
var Search_Data={'currencydetails_Name':currencydetails_Name}
 return this.http.get(environment.BasePath +'currencydetails/Load_All_Account_Type/',{params:Search_Data});}


 Load_InvoiceType(InvoiceType_Name):Observable<any>
{
var Search_Data={'InvoiceType_Name':InvoiceType_Name}
 return this.http.get(environment.BasePath +'currencydetails/Load_InvoiceType/',{params:Search_Data});}
}

