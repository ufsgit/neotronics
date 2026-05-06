import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Primary_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Primary_Details(Primary_Details_)
{
return this.http.post(environment.BasePath +'Primary_Details/Save_Primary_Details/',Primary_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Primary_Details(Primary_Details_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Primary_Details/Search_Primary_Details/'+Primary_Details_Name);}
Delete_Primary_Details(Primary_Details_Id)
{
 return this.http.get(environment.BasePath +'Primary_Details/Delete_Primary_Details/'+Primary_Details_Id);}
Get_Primary_Details(Primary_Details_Id)
{
 return this.http.get(environment.BasePath +'Primary_Details/Get_Primary_Details/'+Primary_Details_Id);}
}

