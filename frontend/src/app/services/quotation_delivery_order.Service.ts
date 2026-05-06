import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class quotation_delivery_order_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_quotation_delivery_order(quotation_delivery_order_)
{
return this.http.post(environment.BasePath +'quotation_delivery_order/Save_quotation_delivery_order/',quotation_delivery_order_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_quotation_delivery_order(quotation_delivery_order_Name):Observable<any>
{
var Search_Data={'quotation_delivery_order_Name':quotation_delivery_order_Name}
 return this.http.get(environment.BasePath +'quotation_delivery_order/Search_quotation_delivery_order/',{params:Search_Data});}
Delete_quotation_delivery_order(quotation_delivery_order_Id)
{
 return this.http.get(environment.BasePath +'quotation_delivery_order/Delete_quotation_delivery_order/'+quotation_delivery_order_Id);}
Get_quotation_delivery_order(quotation_delivery_order_Id)
{
 return this.http.get(environment.BasePath +'quotation_delivery_order/Get_quotation_delivery_order/'+quotation_delivery_order_Id);}
}

