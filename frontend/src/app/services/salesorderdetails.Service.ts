import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class salesorderdetails_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_salesorderdetails(salesorderdetails_)
{
return this.http.post(environment.BasePath +'salesorderdetails/Save_salesorderdetails/',salesorderdetails_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_salesorderdetails(salesorderdetails_Name):Observable<any>
{
var Search_Data={'salesorderdetails_Name':salesorderdetails_Name}
 return this.http.get(environment.BasePath +'salesorderdetails/Search_salesorderdetails/',{params:Search_Data});}
Delete_salesorderdetails(salesorderdetails_Id)
{
 return this.http.get(environment.BasePath +'salesorderdetails/Delete_salesorderdetails/'+salesorderdetails_Id);}
Get_salesorderdetails(salesorderdetails_Id)
{
 return this.http.get(environment.BasePath +'salesorderdetails/Get_salesorderdetails/'+salesorderdetails_Id);}
}

