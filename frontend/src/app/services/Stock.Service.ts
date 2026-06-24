import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Stock_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Stock(Stock_)
{
return this.http.post(environment.BasePath +'Stock/Save_Stock/',Stock_);}

Save_Stock_InStockReport(Stock_)
{
return this.http.post(environment.BasePath +'Stock/Save_Stock_InStockReport/',Stock_);
}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Stock(Stock_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Stock/Search_Stock/'+Stock_Name).pipe(
    map((res: any) => (res && res.success) ? res.data : res)
);
}
Delete_Stock(Stock_Id)
{
 return this.http.get(environment.BasePath +'Stock/Delete_Stock/'+Stock_Id);}
Get_Stock(Stock_Id)
{
 return this.http.get(environment.BasePath +'Stock/Get_Stock/'+Stock_Id).pipe(
    map((res: any) => (res && res.success) ? res.data : res)
);
}
}

