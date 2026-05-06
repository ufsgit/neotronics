import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class performainvoicedetails_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_performainvoicedetails(performainvoicedetails_)
{
return this.http.post(environment.BasePath +'performainvoicedetails/Save_performainvoicedetails/',performainvoicedetails_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_performainvoicedetails(performainvoicedetails_Name):Observable<any>
{
var Search_Data={'performainvoicedetails_Name':performainvoicedetails_Name}
 return this.http.get(environment.BasePath +'performainvoicedetails/Search_performainvoicedetails/',{params:Search_Data});}
Delete_performainvoicedetails(performainvoicedetails_Id)
{
 return this.http.get(environment.BasePath +'performainvoicedetails/Delete_performainvoicedetails/'+performainvoicedetails_Id);}
Get_performainvoicedetails(performainvoicedetails_Id)
{
 return this.http.get(environment.BasePath +'performainvoicedetails/Get_performainvoicedetails/'+performainvoicedetails_Id);}
}

