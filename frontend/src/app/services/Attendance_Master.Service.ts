import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Attendance_Master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Attendance_Master(Attendance_Master_)
{
return this.http.post(environment.BasePath +'Attendance_Master/Save_Attendance_Master/',Attendance_Master_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Attendance_Master(Attendance_Master_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Attendance_Master/Search_Attendance_Master/'+Attendance_Master_Name);}
Delete_Attendance_Master(Attendance_Master_Id)
{
 return this.http.get(environment.BasePath +'Attendance_Master/Delete_Attendance_Master/'+Attendance_Master_Id);}
Get_Attendance_Master(Attendance_Master_Id)
{
 return this.http.get(environment.BasePath +'Attendance_Master/Get_Attendance_Master/'+Attendance_Master_Id);}
}

