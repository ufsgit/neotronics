import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class salesordermaster_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_salesordermaster(salesordermaster_)
{
return this.http.post(environment.BasePath +'salesordermaster/Save_salesordermaster/',salesordermaster_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_salesordermaster(salesordermaster_Name):Observable<any>
{
var Search_Data={'salesordermaster_Name':salesordermaster_Name}
 return this.http.get(environment.BasePath +'salesordermaster/Search_salesordermaster/',{params:Search_Data});}
Delete_salesordermaster(salesordermaster_Id)
{
 return this.http.get(environment.BasePath +'salesordermaster/Delete_salesordermaster/'+salesordermaster_Id);}
Get_salesordermaster(salesordermaster_Id)
{
 return this.http.get(environment.BasePath +'salesordermaster/Get_salesordermaster/'+salesordermaster_Id);}
}

