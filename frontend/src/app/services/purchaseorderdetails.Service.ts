import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class purchaseorderdetails_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_purchaseorderdetails(purchaseorderdetails_)
{
return this.http.post(environment.BasePath +'purchaseorderdetails/Save_purchaseorderdetails/',purchaseorderdetails_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_purchaseorderdetails(purchaseorderdetails_Name):Observable<any>
{
var Search_Data={'purchaseorderdetails_Name':purchaseorderdetails_Name}
 return this.http.get(environment.BasePath +'purchaseorderdetails/Search_purchaseorderdetails/',{params:Search_Data});}
Delete_purchaseorderdetails(purchaseorderdetails_Id)
{
 return this.http.get(environment.BasePath +'purchaseorderdetails/Delete_purchaseorderdetails/'+purchaseorderdetails_Id);}
Get_purchaseorderdetails(purchaseorderdetails_Id)
{
 return this.http.get(environment.BasePath +'purchaseorderdetails/Get_purchaseorderdetails/'+purchaseorderdetails_Id);}
}

