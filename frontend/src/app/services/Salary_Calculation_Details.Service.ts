import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Salary_Calculation_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Salary_Calculation_Details(Salary_Calculation_Details_)
{
return this.http.post(environment.BasePath +'Salary_Calculation_Details/Save_Salary_Calculation_Details/',Salary_Calculation_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Salary_Calculation_Details(Salary_Calculation_Details_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Salary_Calculation_Details/Search_Salary_Calculation_Details/'+Salary_Calculation_Details_Name);}
Delete_Salary_Calculation_Details(Salary_Calculation_Details_Id)
{
 return this.http.get(environment.BasePath +'Salary_Calculation_Details/Delete_Salary_Calculation_Details/'+Salary_Calculation_Details_Id);}
Get_Salary_Calculation_Details(Salary_Calculation_Details_Id)
{
 return this.http.get(environment.BasePath +'Salary_Calculation_Details/Get_Salary_Calculation_Details/'+Salary_Calculation_Details_Id);}
}

