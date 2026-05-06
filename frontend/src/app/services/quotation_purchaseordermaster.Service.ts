import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class quotation_purchaseordermaster_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_quotation_purchaseordermaster(quotation_purchaseordermaster_)
{
return this.http.post(environment.BasePath +'quotation_purchaseordermaster/Save_quotation_purchaseordermaster/',quotation_purchaseordermaster_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_quotation_purchaseordermaster(quotation_purchaseordermaster_Name):Observable<any>
{
var Search_Data={'quotation_purchaseordermaster_Name':quotation_purchaseordermaster_Name}
 return this.http.get(environment.BasePath +'quotation_purchaseordermaster/Search_quotation_purchaseordermaster/',{params:Search_Data});}
Delete_quotation_purchaseordermaster(quotation_purchaseordermaster_Id)
{
 return this.http.get(environment.BasePath +'quotation_purchaseordermaster/Delete_quotation_purchaseordermaster/'+quotation_purchaseordermaster_Id);}
Get_quotation_purchaseordermaster(quotation_purchaseordermaster_Id)
{
 return this.http.get(environment.BasePath +'quotation_purchaseordermaster/Get_quotation_purchaseordermaster/'+quotation_purchaseordermaster_Id);}
}

