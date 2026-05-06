import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Location_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Location(Location_)
{
return this.http.post(environment.BasePath +'Location/Save_Location/',Location_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Location(Location_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Location/Search_Location/'+Location_Name);}
Delete_Location(Location_Id)
{
 return this.http.get(environment.BasePath +'Location/Delete_Location/'+Location_Id);}
Get_Location(Location_Id)
{
 return this.http.get(environment.BasePath +'Location/Get_Location/'+Location_Id);}
}

