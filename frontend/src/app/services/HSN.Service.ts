import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class HSN_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_HSN(HSN_)
{
return this.http.post(environment.BasePath +'HSN/Save_HSN/',HSN_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_HSN(HSN_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'HSN/Search_HSN/'+HSN_Name);}
Delete_HSN(HSN_Id)
{
 return this.http.get(environment.BasePath +'HSN/Delete_HSN/'+HSN_Id);}
Get_HSN(HSN_Id)
{
 return this.http.get(environment.BasePath +'HSN/Get_HSN/'+HSN_Id);}
}

