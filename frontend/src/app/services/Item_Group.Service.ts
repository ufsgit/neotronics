import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Item_Group_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata

Save_Item_Group(Item_Group_)
{
return this.http.post(environment.BasePath +'Item_Group/Save_Item_Group/',Item_Group_);
}

private extractData(res: Response)
{
let body = res;
return body || { };
}

Load_Item_Group(): Observable<any> {
    return this.http.get(environment.BasePath + 'Item_Group/Load_Item_Group/').pipe(
        map((res: any) => (res && res.success) ? res.data : res)
    );
}


// Search_Item_Group(Item_Group_Name):Observable<any>
// {
//  return this.http.get(environment.BasePath +'Item_Group/Search_Item_Group/'+Item_Group_Name);}

 
Search_Item_Group(Item_Group_Name):Observable<any>
{
    if(Item_Group_Name==undefined)
        Item_Group_Name="";

    var Search_Data = { 
        'Item_Group_Name_': Item_Group_Name
       
    }
    return this.http.get(environment.BasePath + 'Item_Group/Search_Item_Group/',  { params: Search_Data }).pipe(
        map((res: any) => (res && res.success) ? res.data : res)
    );
}

Delete_Item_Group(Item_Group_Id)
{
 return this.http.get(environment.BasePath +'Item_Group/Delete_Item_Group/'+Item_Group_Id);}
Get_Item_Group(Item_Group_Id)
{
     
 return this.http.get(environment.BasePath +'Item_Group/Get_Item_Group/'+Item_Group_Id).pipe(
    map((res: any) => (res && res.success) ? res.data : res)
);
}


/*** Added on 17-7-24 */

Save_Master_Category(Item_Group_)
{
return this.http.post(environment.BasePath +'Item_Group/Save_Master_Category/',Item_Group_);
}

/*** */

/*** Added on 18-7-24 */

Search_Master_Category(Item_Group_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Item_Group/Search_Master_Category/'+Item_Group_Name);
}

Delete_Master_Category(Item_Group_Id)
{
 return this.http.get(environment.BasePath +'Item_Group/Delete_Master_Category/'+Item_Group_Id);
}
Get_Master_Category(Item_Group_Id)
{     
 return this.http.get(environment.BasePath +'Item_Group/Get_Master_Category/'+Item_Group_Id);
}
}

