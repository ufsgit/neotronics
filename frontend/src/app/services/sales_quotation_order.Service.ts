import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class sales_quotation_order_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_sales_quotation_order(sales_quotation_order_)
{
return this.http.post(environment.BasePath +'sales_quotation_order/Save_sales_quotation_order/',sales_quotation_order_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_sales_quotation_order(sales_quotation_order_Name):Observable<any>
{
var Search_Data={'sales_quotation_order_Name':sales_quotation_order_Name}
 return this.http.get(environment.BasePath +'sales_quotation_order/Search_sales_quotation_order/',{params:Search_Data});}
Delete_sales_quotation_order(sales_quotation_order_Id)
{
 return this.http.get(environment.BasePath +'sales_quotation_order/Delete_sales_quotation_order/'+sales_quotation_order_Id);}
Get_sales_quotation_order(sales_quotation_order_Id)
{
 return this.http.get(environment.BasePath +'sales_quotation_order/Get_sales_quotation_order/'+sales_quotation_order_Id);}
}

