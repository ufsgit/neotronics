import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class country_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_country(country_)
{
return this.http.post(environment.BasePath +'country/Save_country/',country_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_country(country_Name):Observable<any>
{
var Search_Data={'country_Name':country_Name}
 return this.http.get(environment.BasePath +'country/Search_country/',{params:Search_Data});}
Delete_country(country_Id)
{
 return this.http.get(environment.BasePath +'country/Delete_country/'+country_Id);}
Get_country(country_Id)
{
 return this.http.get(environment.BasePath +'country/Get_country/'+country_Id);}
Get_HSN_Dropdown()
{
     
 return this.http.get(environment.BasePath +'Item/HSN_Dropdown/');
}
Load_country()
{
     
 return this.http.get(environment.BasePath +'country/Load_Country/');
}


}

