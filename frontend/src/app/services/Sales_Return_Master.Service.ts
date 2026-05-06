import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Sales_Return_Master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_sales_return_master(sales_return_master_)
{
return this.http.post(environment.BasePath +'sales_return_master/Save_sales_return_master/',sales_return_master_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_sales_return_master(sales_return_master_Name,a,b,c,d,e):Observable<any>
{
var Search_Data={'sales_return_master_Name':sales_return_master_Name}
 return this.http.get(environment.BasePath +'sales_return_master/Search_sales_return_master/',{params:Search_Data});}
Delete_sales_return_master(sales_return_master_Id)
{
 return this.http.get(environment.BasePath +'sales_return_master/Delete_sales_return_master/'+sales_return_master_Id);}
Get_sales_return_master(sales_return_master_Id)
{
 return this.http.get(environment.BasePath +'sales_return_master/Get_sales_return_master/'+sales_return_master_Id);}
}

