import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Account_Years_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Account_Years(Account_Years_)
{
return this.http.post(environment.BasePath +'Account_Years/Save_Account_Years/',Account_Years_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Account_Years():Observable<any>
{
 return this.http.get(environment.BasePath +'Account_Years/Search_Account_Years/');}
Delete_Account_Years(Account_Years_Id)
{
 return this.http.get(environment.BasePath +'Account_Years/Delete_Account_Years/'+Account_Years_Id);}
Get_Account_Years(Account_Years_Id)
{
 return this.http.get(environment.BasePath +'Account_Years/Get_Account_Years/'+Account_Years_Id);}
}

