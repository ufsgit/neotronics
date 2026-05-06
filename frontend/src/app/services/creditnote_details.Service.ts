import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class creditnote_details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_creditnote_details(creditnote_details_)
{
return this.http.post(environment.BasePath +'creditnote_details/Save_creditnote_details/',creditnote_details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_creditnote_details(creditnote_details_Name):Observable<any>
{
var Search_Data={'creditnote_details_Name':creditnote_details_Name}
 return this.http.get(environment.BasePath +'creditnote_details/Search_creditnote_details/',{params:Search_Data});}
Delete_creditnote_details(creditnote_details_Id)
{
 return this.http.get(environment.BasePath +'creditnote_details/Delete_creditnote_details/'+creditnote_details_Id);}
Get_creditnote_details(creditnote_details_Id)
{
 return this.http.get(environment.BasePath +'creditnote_details/Get_creditnote_details/'+creditnote_details_Id);}
}

