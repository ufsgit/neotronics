import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Damage_Master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Damage_Master(Damage_Master_)
{
return this.http.post(environment.BasePath +'Damage_Master/Save_Damage_Master/',Damage_Master_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Damage_Master(From_Date,To_Date,look_In_Date_Value):Observable<any>
{
 return this.http.get(environment.BasePath +'Damage_Master/Search_Damage_Master/'+From_Date+'/'+To_Date + '/'+look_In_Date_Value);
}
 Delete_Damage_Master(Damage_Master_Id)
{
 return this.http.get(environment.BasePath +'Damage_Master/Delete_Damage_Master/'+Damage_Master_Id);}
Get_Damage_Details(Damage_Master_Id):Observable<any>
{
    return this.http.get(environment.BasePath +'Damage_Master/Get_Damage_Master/'+Damage_Master_Id);
}
Search_Damage_Report(From_Date,To_Date,look_In_Date_Value,Item_Id):Observable<any>
{
    return this.http.get(environment.BasePath + 'Damage_Master/Search_Damage_Report/' + From_Date + '/' + To_Date + '/' + look_In_Date_Value + '/' + Item_Id);
}
}


