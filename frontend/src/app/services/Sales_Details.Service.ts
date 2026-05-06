import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Sales_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Sales_Details(Sales_Details_)
{
return this.http.post(environment.BasePath +'Sales_Details/Save_Sales_Details/',Sales_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Sales_Details(Sales_Details_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Sales_Details/Search_Sales_Details/'+Sales_Details_Name);}
Delete_Sales_Details(Sales_Details_Id)
{
 return this.http.get(environment.BasePath +'Sales_Details/Delete_Sales_Details/'+Sales_Details_Id);}
Get_Sales_Details(Sales_Details_Id)
{
 return this.http.get(environment.BasePath +'Sales_Details/Get_Sales_Details/'+Sales_Details_Id);}

 Get_Quotation_Details(Quotation_Master_Id)
 {
  return this.http.get(environment.BasePath +'Sales_Details/Get_Quotation_Details/'+Quotation_Master_Id);}




}

