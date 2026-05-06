import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Attendance_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Attendance_Details(Attendance_Details_)
{
return this.http.post(environment.BasePath +'Attendance_Details/Save_Attendance_Details/',Attendance_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Attendance_Details(Attendance_Details_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Attendance_Details/Search_Attendance_Details/'+Attendance_Details_Name);}
Delete_Attendance_Details(Attendance_Details_Id)
{
 return this.http.get(environment.BasePath +'Attendance_Details/Delete_Attendance_Details/'+Attendance_Details_Id);}
Get_Attendance_Details(Attendance_Details_Id)
{
 return this.http.get(environment.BasePath +'Attendance_Details/Get_Attendance_Details/'+Attendance_Details_Id);}
}

