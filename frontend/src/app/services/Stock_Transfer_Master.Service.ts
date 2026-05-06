import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Stock_Transfer_Master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Stock_Transfer_Master(Stock_Transfer_Master_)
{
    
return this.http.post(environment.BasePath +'Stock_Transfer_Master/Save_Stock_Transfer_Master/',Stock_Transfer_Master_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Stock_Transfer_Master(From_Date,To_Date):Observable<any>
{
    
 return this.http.get(environment.BasePath +'Stock_Transfer_Master/Search_Stock_Transfer_Master/'+From_Date+'/'+To_Date);}

 From_Stock_Typeahead(Client_Accounts_Name):Observable<any>
 { 
  return this.http.get(environment.BasePath +'Client_Accounts/From_Stock_Typeahead/'+Client_Accounts_Name);
}
Search_To_Stock_Typeahead(Client_Id,Item_Name):Observable<any>
{
   return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);
}
 Search_Item_Typeahead(Item_Name):Observable<any>
{

    var Search_Data = { 'Item_Name': Item_Name }
 return this.http.get(environment.BasePath +'Stock/Get_Stock_Item_Typeahead/', { params: Search_Data });
}
 Search_Barcode_Typeahead(Barcode):Observable<any>
 {
     if(Barcode==undefined)
     Barcode="";
  return this.http.get(environment.BasePath +'Stock/Get_Barcode_Typeahead/'+Barcode);
}
Search_Stock_Transfer_Report(Look_In_Date,Search_FromDate,Search_ToDate,From_Id, Item_Id,To_Id):Observable<any>
{
 return this.http.get(environment.BasePath +'Stock_Transfer_Master/Search_Stock_Transfer_Report/'+Look_In_Date+'/'+Search_FromDate+'/'+Search_ToDate+'/'+From_Id+'/'+Item_Id+'/'+To_Id);
}
 Delete_Stock_Transfer_Master(Stock_Transfer_Master_Id)
{
 return this.http.get(environment.BasePath +'Stock_Transfer_Master/Delete_Stock_Transfer_Master/'+Stock_Transfer_Master_Id);}
Get_Stock_Transfer_Details(Stock_Transfer_Master_Id):Observable<any>
{
 return this.http.get(environment.BasePath +'Stock_Transfer_Details/Get_Stock_Transfer_Details/'+Stock_Transfer_Master_Id);}
}

