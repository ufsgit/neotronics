import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Account_Group_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Account_Group(Account_Group_)
{
     
return this.http.post(environment.BasePath +'Account_Group/Save_Account_Group/',Account_Group_);}

private extractData(res: Response)
{
let body = res;
return body || { };
}
 Search_Account_Group(Account_Group_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Account_Group/Search_Account_Group/'+Account_Group_Name);}
 Search_Account_Group_Typeahead(Account_Group_Name):Observable<any>
 {
  return this.http.get(environment.BasePath +'Account_Group/Search_Account_Group_Typeahead/'+Account_Group_Name);}
 Load_Account_Group(Account_Group_Name):Observable<any>
 {
  return this.http.get(environment.BasePath +'Account_Group/Load_Account_Group/'+Account_Group_Name);}

 Delete_Account_Group(Account_Group_Id)
{
 return this.http.get(environment.BasePath +'Account_Group/Delete_Account_Group/'+Account_Group_Id);}
Get_Account_Group(Account_Group_Id)
{
 return this.http.get(environment.BasePath +'Account_Group/Get_Account_Group/'+Account_Group_Id);}
}

