import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Sale_Unit_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Sale_Unit(Sale_Unit_)
{
    
return this.http.post(environment.BasePath +'Sale_Unit/Save_Sale_Unit/',Sale_Unit_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Sale_Unit(Sale_Unit_Name):Observable<any>
{
    
 return this.http.get(environment.BasePath +'Sale_Unit/Search_Sale_Unit/'+Sale_Unit_Name);}
Delete_Sale_Unit(Sale_Unit_Id)
{
 return this.http.get(environment.BasePath +'Sale_Unit/Delete_Sale_Unit/'+Sale_Unit_Id);}
Get_Sale_Unit(Sale_Unit_Id)
{
 return this.http.get(environment.BasePath +'Sale_Unit/Get_Sale_Unit/'+Sale_Unit_Id);}
}

