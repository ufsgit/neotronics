import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class salesquotationmaster_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_salesquotationmaster(salesquotationmaster_)
{
return this.http.post(environment.BasePath +'salesquotationmaster/Save_salesquotationmaster/',salesquotationmaster_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_salesquotationmaster(salesquotationmaster_Name):Observable<any>
{
var Search_Data={'salesquotationmaster_Name':salesquotationmaster_Name}
 return this.http.get(environment.BasePath +'salesquotationmaster/Search_salesquotationmaster/',{params:Search_Data});}
Delete_salesquotationmaster(salesquotationmaster_Id)
{
 return this.http.get(environment.BasePath +'salesquotationmaster/Delete_salesquotationmaster/'+salesquotationmaster_Id);}
Get_salesquotationmaster(salesquotationmaster_Id)
{
 return this.http.get(environment.BasePath +'salesquotationmaster/Get_salesquotationmaster/'+salesquotationmaster_Id);}

 Get_salesPerformaInvoicemaster(PerformaInvoiceId)
{
    debugger
 return this.http.get(environment.BasePath +'salesquotationmaster/Get_salesPerformaInvoicemaster/'+PerformaInvoiceId);
}

/** Added on 17-10-2024 */

Load_DeliveryOrder(DeliveryOrderMaster_Id)
{
    debugger
 return this.http.get(environment.BasePath +'salesquotationmaster/Load_DeliveryOrder/'+DeliveryOrderMaster_Id);
}

Load_PurchaseOrder(PurchaseOrderMaster_Id)
{
    debugger
 return this.http.get(environment.BasePath +'salesquotationmaster/Load_PurchaseOrder/'+PurchaseOrderMaster_Id);
}

/*** Added on 18-10-2024 */

Load_PackingList(PackingList_Master_Id)
{
    debugger
 return this.http.get(environment.BasePath +'salesquotationmaster/Load_PackingList/'+PackingList_Master_Id);
}

}

