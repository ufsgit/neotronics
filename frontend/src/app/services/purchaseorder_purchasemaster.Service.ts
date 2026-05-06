import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class purchaseorder_purchasemaster_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_purchaseorder_purchasemaster(purchaseorder_purchasemaster_)
{
return this.http.post(environment.BasePath +'purchaseorder_purchasemaster/Save_purchaseorder_purchasemaster/',purchaseorder_purchasemaster_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_purchaseorder_purchasemaster(purchaseorder_purchasemaster_Name):Observable<any>
{
var Search_Data={'purchaseorder_purchasemaster_Name':purchaseorder_purchasemaster_Name}
 return this.http.get(environment.BasePath +'purchaseorder_purchasemaster/Search_purchaseorder_purchasemaster/',{params:Search_Data});}
Delete_purchaseorder_purchasemaster(purchaseorder_purchasemaster_Id)
{
 return this.http.get(environment.BasePath +'purchaseorder_purchasemaster/Delete_purchaseorder_purchasemaster/'+purchaseorder_purchasemaster_Id);}
Get_purchaseorder_purchasemaster(purchaseorder_purchasemaster_Id)
{
 return this.http.get(environment.BasePath +'purchaseorder_purchasemaster/Get_purchaseorder_purchasemaster/'+purchaseorder_purchasemaster_Id);}
}

