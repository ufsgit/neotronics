import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Damage_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Damage_Details(Damage_Details_)
{
return this.http.post(environment.BasePath +'Damage_Details/Save_Damage_Details/',Damage_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Damage_Details(Damage_Details_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Damage_Details/Search_Damage_Details/'+Damage_Details_Name);}
Delete_Damage_Details(Damage_Details_Id)
{
 return this.http.get(environment.BasePath +'Damage_Details/Delete_Damage_Details/'+Damage_Details_Id);}
Get_Damage_Details(Damage_Details_Id)
{
 return this.http.get(environment.BasePath +'Damage_Details/Get_Damage_Details/'+Damage_Details_Id);}
}

