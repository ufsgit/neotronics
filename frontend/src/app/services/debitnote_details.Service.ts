import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class debitnote_details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_debitnote_details(debitnote_details_)
{
return this.http.post(environment.BasePath +'debitnote_details/Save_debitnote_details/',debitnote_details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_debitnote_details(debitnote_details_Name):Observable<any>
{
var Search_Data={'debitnote_details_Name':debitnote_details_Name}
 return this.http.get(environment.BasePath +'debitnote_details/Search_debitnote_details/',{params:Search_Data});}
Delete_debitnote_details(debitnote_details_Id)
{
 return this.http.get(environment.BasePath +'debitnote_details/Delete_debitnote_details/'+debitnote_details_Id);}
Get_debitnote_details(debitnote_details_Id)
{
 return this.http.get(environment.BasePath +'debitnote_details/Get_debitnote_details/'+debitnote_details_Id);}
}

