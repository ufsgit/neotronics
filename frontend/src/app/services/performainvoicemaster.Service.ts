import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class performainvoicemaster_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_performainvoicemaster(performainvoicemaster_)
{
return this.http.post(environment.BasePath +'performainvoicemaster/Save_performainvoicemaster/',performainvoicemaster_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_performainvoicemaster(performainvoicemaster_Name):Observable<any>
{
var Search_Data={'performainvoicemaster_Name':performainvoicemaster_Name}
 return this.http.get(environment.BasePath +'performainvoicemaster/Search_performainvoicemaster/',{params:Search_Data});}
Delete_performainvoicemaster(performainvoicemaster_Id)
{
 return this.http.get(environment.BasePath +'performainvoicemaster/Delete_performainvoicemaster/'+performainvoicemaster_Id);}
Get_performainvoicemaster(performainvoicemaster_Id)
{
 return this.http.get(environment.BasePath +'performainvoicemaster/Get_performainvoicemaster/'+performainvoicemaster_Id);}
}

