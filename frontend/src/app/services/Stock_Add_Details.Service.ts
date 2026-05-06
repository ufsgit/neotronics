import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Stock_Add_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Stock_Add_Details(Stock_Add_Details_)
{
return this.http.post(environment.BasePath +'Stock_Add_Details/Save_Stock_Add_Details/',Stock_Add_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Stock_Add_Details(Stock_Add_Details_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Stock_Add_Details/Search_Stock_Add_Details/'+Stock_Add_Details_Name);}
Delete_Stock_Add_Details(Stock_Add_Details_Id)
{
 return this.http.get(environment.BasePath +'Stock_Add_Details/Delete_Stock_Add_Details/'+Stock_Add_Details_Id);}
Get_Stock_Add_Details(Stock_Add_Details_Id)
{
 return this.http.get(environment.BasePath +'Stock_Add_Details/Get_Stock_Add_Details/'+Stock_Add_Details_Id);}
 Get_ItemGroup_Load_Data():Observable<any>
 {
    debugger
 return this.http.get(environment.BasePath +'Stock_Add_Details/Get_ItemGroup_Load_Data/');
 }

 /*** Added on 23-02-2024 */
Get_Item_Name_Get_With_Code_Stock_Add_Details(Item_Code):Observable<any>
{
    return this.http.get(environment.BasePath +'Stock_Add_Details/Get_Item_Name_Get_With_Code_Stock_Add_Details/'+Item_Code);
}

 
 
}

