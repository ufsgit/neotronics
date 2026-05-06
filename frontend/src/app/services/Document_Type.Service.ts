import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Document_Type_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Document_Type(Document_Type_)
{
    debugger
return this.http.post(environment.BasePath +'Document_Type/Save_Document_Type/',Document_Type_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}

Load_Document_Type(): Observable<any> {
         

    return this.http.get(environment.BasePath + 'Document_Type/Load_Document_Type/');
}


Search_Document_Type(Document_Type_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Document_Type/Search_Document_Type/'+Document_Type_Name);}
Delete_Document_Type(Document_Type_Id)
{
    debugger
 return this.http.get(environment.BasePath +'Document_Type/Delete_Document_Type/'+Document_Type_Id);}
Get_Document_Type(Document_Type_Id)
{
     
 return this.http.get(environment.BasePath +'Document_Type/Get_Document_Type/'+Document_Type_Id);}
}

