import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Employee_Location_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Employee_Location(Employee_Location_)
{
return this.http.post(environment.BasePath +'Employee_Location/Save_Employee_Location/',Employee_Location_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Employee_Location(Employee_Location_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Employee_Location/Search_Employee_Location/'+Employee_Location_Name);}
Delete_Employee_Location(Employee_Location_Id)
{
 return this.http.get(environment.BasePath +'Employee_Location/Delete_Employee_Location/'+Employee_Location_Id);}
Get_Employee_Location(Employee_Location_Id)
{
 return this.http.get(environment.BasePath +'Employee_Location/Get_Employee_Location/'+Employee_Location_Id);}
}

