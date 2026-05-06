import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Stock_Take_Name_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
private extractData(res: Response)
{
let body = res;
return body || { };
}
Save_stock_take_name(stock_take_name_)
{
return this.http.post(environment.BasePath +'stock_take_name/Save_stock_take_name/',stock_take_name_);}

// Search_Item(Item_Name,Group_Id_,Item_Code_):Observable<any>
// {
//     debugger
//  return this.http.get(environment.BasePath +'Item/Search_Item/'+Item_Name+'/'+Group_Id_+'/'+Item_Code_);}

Search_stock_take_name(Stocktakename):Observable<any>
{
    if(Stocktakename==undefined)
        Stocktakename="";
    var Search_Data = { 
        'Stocktakename_': Stocktakename
    }
    return this.http.get(environment.BasePath + 'stock_take_name/Search_stock_take_name/',  { params: Search_Data });
}

Get_StockTakeName_Dropdown()
{     
 return this.http.get(environment.BasePath +'stock_take_name/Get_StockTakeName_Dropdown/');
}

Delete_stock_take_name(Stock_Take_Name_Id_)
{
 return this.http.get(environment.BasePath +'stock_take_name/Delete_stock_take_name/'+Stock_Take_Name_Id_);}

Get_stock_take_name(Stock_Take_Name_Id_)
{
 return this.http.get(environment.BasePath +'stock_take_name/Get_stock_take_name/'+Stock_Take_Name_Id_);
}

Status_Dropdown()
{     
 return this.http.get(environment.BasePath +'stock_take_name/Status_Dropdown/');
}

}

