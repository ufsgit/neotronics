import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Employee_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Employee_Details(Employee_Master_)
{
   
return this.http.post(environment.BasePath +'Employee_Details/Save_Employee_Details/',Employee_Master_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Employee_Details(Employee_Details_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Employee_Details/Search_Employee_Details/'+Employee_Details_Name);}
Delete_Employee_Details(Employee_Details_Id)
{
   
 return this.http.get(environment.BasePath +'Employee_Details/Delete_Employee_Details/'+Employee_Details_Id);}
Get_Employee_Details(Client_Accounts_Id):Observable<any>
{
 return this.http.get(environment.BasePath +'Employee_Details/Get_Employee_Detail/'+Client_Accounts_Id);}
 Search_Under_Employee(Under_Group_Id,Client_Account_Name):Observable<any>
{
  if(Client_Account_Name==undefined)
  Client_Account_Name="";
 return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Under_Group_Id+'/'+Client_Account_Name);}
 Load_Location():Observable<any>
 {
  return this.http.get(environment.BasePath +'Location/Load_Location');}
}

