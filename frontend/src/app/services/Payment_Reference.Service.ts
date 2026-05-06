import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Payment_Reference_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Payment_Reference(Payment_Reference_)
{
return this.http.post(environment.BasePath +'Payment_Reference/Save_Payment_Reference/',Payment_Reference_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Payment_Reference(Payment_Reference_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Payment_Reference/Search_Payment_Reference/'+Payment_Reference_Name);}
Delete_Payment_Reference(Payment_Reference_Id)
{
 return this.http.get(environment.BasePath +'Payment_Reference/Delete_Payment_Reference/'+Payment_Reference_Id);}
Get_Payment_Reference(Payment_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Payment_Reference/Get_Payment_Reference/'+Payment_Voucher_Id);}
}

