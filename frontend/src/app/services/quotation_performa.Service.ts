import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class quotation_performa_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_quotation_performa(quotation_performa_)
{
return this.http.post(environment.BasePath +'quotation_performa/Save_quotation_performa/',quotation_performa_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_quotation_performa(quotation_performa_Name):Observable<any>
{
var Search_Data={'quotation_performa_Name':quotation_performa_Name}
 return this.http.get(environment.BasePath +'quotation_performa/Search_quotation_performa/',{params:Search_Data});}
Delete_quotation_performa(quotation_performa_Id)
{
 return this.http.get(environment.BasePath +'quotation_performa/Delete_quotation_performa/'+quotation_performa_Id);}
Get_quotation_performa(quotation_performa_Id)
{
 return this.http.get(environment.BasePath +'quotation_performa/Get_quotation_performa/'+quotation_performa_Id);}
}

