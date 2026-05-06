import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class purchaseordermaster_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_purchaseordermaster(purchaseordermaster_)
{
return this.http.post(environment.BasePath +'purchaseordermaster/Save_purchaseordermaster/',purchaseordermaster_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_purchaseordermaster(purchaseordermaster_Name):Observable<any>
{
var Search_Data={'purchaseordermaster_Name':purchaseordermaster_Name}
 return this.http.get(environment.BasePath +'purchaseordermaster/Search_purchaseordermaster/',{params:Search_Data});}
Delete_purchaseordermaster(purchaseordermaster_Id)
{
 return this.http.get(environment.BasePath +'purchaseordermaster/Delete_purchaseordermaster/'+purchaseordermaster_Id);}
Get_purchaseordermaster(purchaseordermaster_Id)
{
 return this.http.get(environment.BasePath +'purchaseordermaster/Get_purchaseordermaster/'+purchaseordermaster_Id);}

 Search_PurchaseOrderNumber_Typeahead(InvoiceNo_):Observable<any>
{
    debugger;
    if(InvoiceNo_==undefined)
        InvoiceNo_="";
    return this.http.get(environment.BasePath +'purchaseordermaster/Search_PurchaseOrderNumber_Typeahead/'+InvoiceNo_);
}



/** Added on 20-09-2024 */

Search_PurchaseOrderNumber_DeliveryOrderMaster_Typeahead(InvoiceNo_,DeliveryOrderMaster_Id_):Observable<any> 
{
    if(InvoiceNo_==undefined || InvoiceNo_ == null || InvoiceNo_ == "")
        InvoiceNo_="a&";
    return this.http.get(environment.BasePath +'purchaseordermaster/Search_PurchaseOrderNumber_DeliveryOrderMaster_Typeahead/'+InvoiceNo_+'/'+DeliveryOrderMaster_Id_);
}

}

