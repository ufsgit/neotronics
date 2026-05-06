import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class performa_delivery_order_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_performa_delivery_order(performa_delivery_order_)
{
return this.http.post(environment.BasePath +'performa_delivery_order/Save_performa_delivery_order/',performa_delivery_order_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_performa_delivery_order(performa_delivery_order_Name):Observable<any>
{
var Search_Data={'performa_delivery_order_Name':performa_delivery_order_Name}
 return this.http.get(environment.BasePath +'performa_delivery_order/Search_performa_delivery_order/',{params:Search_Data});}
Delete_performa_delivery_order(performa_delivery_order_Id)
{
 return this.http.get(environment.BasePath +'performa_delivery_order/Delete_performa_delivery_order/'+performa_delivery_order_Id);}
Get_performa_delivery_order(performa_delivery_order_Id)
{
 return this.http.get(environment.BasePath +'performa_delivery_order/Get_performa_delivery_order/'+performa_delivery_order_Id);}
}

