import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Menu_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Menu(Menu_)
{
return this.http.post(environment.BasePath +'Menu/Save_Menu/',Menu_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Get_Menu_Permission(Login_Id): Observable<any> 
{
 return this.http.get(environment.BasePath + 'User_Details/Get_Menu_Permission/' + Login_Id);
}
Search_Menu(Menu_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Menu/Search_Menu/'+Menu_Name);}
Delete_Menu(Menu_Id)
{
 return this.http.get(environment.BasePath +'Menu/Delete_Menu/'+Menu_Id);}
Get_Menu(Menu_Id)
{
 return this.http.get(environment.BasePath +'Menu/Get_Menu/'+Menu_Id);}
}

