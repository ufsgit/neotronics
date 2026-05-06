import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class General_Settings_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_General_Settings(General_Settings_)
{
return this.http.post(environment.BasePath +'General_Settings/Save_General_Settings/',General_Settings_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_General_Settings(General_Settings_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'General_Settings/Search_General_Settings/'+General_Settings_Name);}
Delete_General_Settings(General_Settings_Id)
{
 return this.http.get(environment.BasePath +'General_Settings/Delete_General_Settings/'+General_Settings_Id);}
Get_General_Settings(General_Settings_Id)
{
 return this.http.get(environment.BasePath +'General_Settings/Get_General_Settings/'+General_Settings_Id);}
 Get_General_Settings1()
 {
  return this.http.get(environment.BasePath +'General_Settings/Get_General_Settings1/');}
 

}

