import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Country_Of_Orgin_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Country_Of_Orgin(Country_Of_Orgin_)
{
return this.http.post(environment.BasePath +'Country_Of_Orgin/Save_Country_Of_Orgin/',Country_Of_Orgin_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Country_Of_Orgin(Country_Of_Orgin_Name):Observable<any>
{
var Search_Data={'Country_Of_Orgin_Name':Country_Of_Orgin_Name}
 return this.http.get(environment.BasePath +'Country_Of_Orgin/Search_Country_Of_Orgin/',{params:Search_Data});}
Delete_Country_Of_Orgin(Country_Of_Orgin_Id)
{
 return this.http.get(environment.BasePath +'Country_Of_Orgin/Delete_Country_Of_Orgin/'+Country_Of_Orgin_Id);}
Get_Country_Of_Orgin(Country_Of_Orgin_Id)
{
 return this.http.get(environment.BasePath +'Country_Of_Orgin/Get_Country_Of_Orgin/'+Country_Of_Orgin_Id);}
}

