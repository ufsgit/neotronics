import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class quotation_salesmaster_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_quotation_salesmaster(quotation_salesmaster_)
{
return this.http.post(environment.BasePath +'quotation_salesmaster/Save_quotation_salesmaster/',quotation_salesmaster_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_quotation_salesmaster(quotation_salesmaster_Name):Observable<any>
{
var Search_Data={'quotation_salesmaster_Name':quotation_salesmaster_Name}
 return this.http.get(environment.BasePath +'quotation_salesmaster/Search_quotation_salesmaster/',{params:Search_Data});}
Delete_quotation_salesmaster(quotation_salesmaster_Id)
{
 return this.http.get(environment.BasePath +'quotation_salesmaster/Delete_quotation_salesmaster/'+quotation_salesmaster_Id);}
Get_quotation_salesmaster(quotation_salesmaster_Id)
{
 return this.http.get(environment.BasePath +'quotation_salesmaster/Get_quotation_salesmaster/'+quotation_salesmaster_Id);}
}

