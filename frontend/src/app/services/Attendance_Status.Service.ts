import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Attendance_Status_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Attendance_Status(Attendance_Status_)
{
return this.http.post(environment.BasePath +'Attendance_Status/Save_Attendance_Status/',Attendance_Status_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Attendance_Status(Attendance_Status_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Attendance_Status/Search_Attendance_Status/'+Attendance_Status_Name);}
Delete_Attendance_Status(Attendance_Status_Id)
{
 return this.http.get(environment.BasePath +'Attendance_Status/Delete_Attendance_Status/'+Attendance_Status_Id);}
Get_Attendance_Status(Attendance_Status_Id)
{
 return this.http.get(environment.BasePath +'Attendance_Status/Get_Attendance_Status/'+Attendance_Status_Id);}
}

