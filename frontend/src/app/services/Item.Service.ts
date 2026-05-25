import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Item_Service {
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
Save_Item(Item_)
{
return this.http.post(environment.BasePath +'Item/Save_Item/',Item_);}

// Search_Item(Item_Name,Group_Id_,Item_Code_):Observable<any>
// {
//     debugger
//  return this.http.get(environment.BasePath +'Item/Search_Item/'+Item_Name+'/'+Group_Id_+'/'+Item_Code_);}

Search_Item(Item_Name,Group_Id_,Item_Code_):Observable<any>
{
    if(Item_Name==undefined)
        Item_Name="";

    var Search_Data = { 
        'Item_Name_': Item_Name,
        'Group_Id_': Group_Id_,
        'Item_Code_': Item_Code_
    }
    return this.http.get(environment.BasePath + 'Item/Search_Item/',  { params: Search_Data });
}

Item_Typeahead(Item_Name):Observable<any>
{
    if(Item_Name==undefined)
        Item_Name="";

    var Search_Data = {
        'Item_Name': Item_Name
    }
    return this.http.get(environment.BasePath + 'Item/Item_Typeahead/',  { params: Search_Data });
}

Delete_Item(Item_Id)
{
 return this.http.get(environment.BasePath +'Item/Delete_Item/'+Item_Id);}
Get_Item(Item_Id)
{
 return this.http.get(environment.BasePath +'Item/Get_Item/'+Item_Id);
}

Get_HSN(HSN_Id)
{
     
 return this.http.get(environment.BasePath +'HSN/Get_HSN/'+HSN_Id);
}

Get_HSN_Dropdown()
{
     
 return this.http.get(environment.BasePath +'Item/HSN_Dropdown/');
}


Save_Service_Type(Service_Type_)
{
    return this.http.post(environment.BasePath +'Item/Save_Service_Type/',Service_Type_);}
Search_Service_Type(Service_Type_Name):Observable<any>
{
    return this.http.get(environment.BasePath +'Item/Search_Service_Type/'+Service_Type_Name);}
Delete_Service_Type(Service_Type_Id)
{
    return this.http.get(environment.BasePath +'Item/Delete_Service_Type/'+Service_Type_Id);}
Get_Service_Type(Service_Type_Id)
{
    return this.http.get(environment.BasePath +'Item/Get_Service_Type/'+Service_Type_Id);
}
Get_Multiple_Sale_Rates(Item_Id): Observable<any>
{
    return this.http.get(environment.BasePath + 'Item/Get_Multiple_Sale_Rates/' + Item_Id);
}
}

