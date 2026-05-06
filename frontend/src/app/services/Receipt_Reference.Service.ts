import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Receipt_Reference_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Receipt_Reference(Receipt_Reference_)
{
return this.http.post(environment.BasePath +'Receipt_Reference/Save_Receipt_Reference/',Receipt_Reference_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Receipt_Reference(Receipt_Reference_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Receipt_Reference/Search_Receipt_Reference/'+Receipt_Reference_Name);}
Delete_Receipt_Reference(Receipt_Reference_Id)
{
 return this.http.get(environment.BasePath +'Receipt_Reference/Delete_Receipt_Reference/'+Receipt_Reference_Id);}
Get_Receipt_Reference(Receipt_Reference_Id)
{
 return this.http.get(environment.BasePath +'Receipt_Reference/Get_Receipt_Reference/'+Receipt_Reference_Id);}
}

