import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class performa_salesmaster_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_performa_salesmaster(performa_salesmaster_)
{
return this.http.post(environment.BasePath +'performa_salesmaster/Save_performa_salesmaster/',performa_salesmaster_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_performa_salesmaster(performa_salesmaster_Name):Observable<any>
{
var Search_Data={'performa_salesmaster_Name':performa_salesmaster_Name}
 return this.http.get(environment.BasePath +'performa_salesmaster/Search_performa_salesmaster/',{params:Search_Data});}
Delete_performa_salesmaster(performa_salesmaster_Id)
{
 return this.http.get(environment.BasePath +'performa_salesmaster/Delete_performa_salesmaster/'+performa_salesmaster_Id);}
Get_performa_salesmaster(performa_salesmaster_Id)
{
 return this.http.get(environment.BasePath +'performa_salesmaster/Get_performa_salesmaster/'+performa_salesmaster_Id);}
}

