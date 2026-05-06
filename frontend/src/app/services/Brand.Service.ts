import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Brand_Service {
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
Save_Brand(Brand_)
{
return this.http.post(environment.BasePath +'Brand/Save_Brand/',Brand_);}

// Search_Brand(Brand_Name):Observable<any>
// {debugger
//  return this.http.get(environment.BasePath +'Brand/Search_Brand/'+Brand_Name);}

Search_Brand(Brand_Name):Observable<any>
{
    if(Brand_Name==undefined)
        Brand_Name="";

    var Search_Data = { 
        'Brand_Name_': Brand_Name
    }
    return this.http.get(environment.BasePath + 'Brand/Search_Brand/',  { params: Search_Data });
}

Delete_Brand(Brand_Id)
{
 return this.http.get(environment.BasePath +'Brand/Delete_Brand/'+Brand_Id);}
Get_Brand(Brand_Id)
{
 return this.http.get(environment.BasePath +'Brand/Get_Brand/'+Brand_Id);
}

Get_HSN(HSN_Id)
{
     
 return this.http.get(environment.BasePath +'HSN/Get_HSN/'+HSN_Id);
}

Search_Under_Brand()
{
     
 return this.http.get(environment.BasePath +'Brand/Search_Under_Brand/');
}


Save_Service_Type(Service_Type_)
{
    return this.http.post(environment.BasePath +'Brand/Save_Service_Type/',Service_Type_);}
Search_Service_Type(Service_Type_Name):Observable<any>
{
    return this.http.get(environment.BasePath +'Brand/Search_Service_Type/'+Service_Type_Name);}
Delete_Service_Type(Service_Type_Id)
{
    return this.http.get(environment.BasePath +'Brand/Delete_Service_Type/'+Service_Type_Id);}
Get_Service_Type(Service_Type_Id)
{
    return this.http.get(environment.BasePath +'Brand/Get_Service_Type/'+Service_Type_Id);
}
}

