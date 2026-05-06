import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Sales_Return_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_sales_return_details(sales_return_details_)
{
return this.http.post(environment.BasePath +'sales_return_details/Save_sales_return_details/',sales_return_details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_sales_return_details(sales_return_details_Name):Observable<any>
{
var Search_Data={'sales_return_details_Name':sales_return_details_Name}
 return this.http.get(environment.BasePath +'sales_return_details/Search_sales_return_details/',{params:Search_Data});}
Delete_sales_return_details(sales_return_details_Id)
{
 return this.http.get(environment.BasePath +'sales_return_details/Delete_sales_return_details/'+sales_return_details_Id);}
Get_sales_return_details(sales_return_details_Id)
{
 return this.http.get(environment.BasePath +'sales_return_details/Get_sales_return_details/'+sales_return_details_Id);}
}

