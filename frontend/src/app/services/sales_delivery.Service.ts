import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class sales_delivery_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_sales_delivery(sales_delivery_)
{
return this.http.post(environment.BasePath +'sales_delivery/Save_sales_delivery/',sales_delivery_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_sales_delivery(sales_delivery_Name):Observable<any>
{
var Search_Data={'sales_delivery_Name':sales_delivery_Name}
 return this.http.get(environment.BasePath +'sales_delivery/Search_sales_delivery/',{params:Search_Data});}
Delete_sales_delivery(sales_delivery_Id)
{
 return this.http.get(environment.BasePath +'sales_delivery/Delete_sales_delivery/'+sales_delivery_Id);}
Get_sales_delivery(sales_delivery_Id)
{
 return this.http.get(environment.BasePath +'sales_delivery/Get_sales_delivery/'+sales_delivery_Id);}
}

