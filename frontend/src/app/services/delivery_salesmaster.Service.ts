import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class delivery_salesmaster_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_delivery_salesmaster(delivery_salesmaster_)
{
return this.http.post(environment.BasePath +'delivery_salesmaster/Save_delivery_salesmaster/',delivery_salesmaster_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_delivery_salesmaster(delivery_salesmaster_Name):Observable<any>
{
var Search_Data={'delivery_salesmaster_Name':delivery_salesmaster_Name}
 return this.http.get(environment.BasePath +'delivery_salesmaster/Search_delivery_salesmaster/',{params:Search_Data});}
Delete_delivery_salesmaster(delivery_salesmaster_Id)
{
 return this.http.get(environment.BasePath +'delivery_salesmaster/Delete_delivery_salesmaster/'+delivery_salesmaster_Id);}
Get_delivery_salesmaster(delivery_salesmaster_Id)
{
 return this.http.get(environment.BasePath +'delivery_salesmaster/Get_delivery_salesmaster/'+delivery_salesmaster_Id);}
}

