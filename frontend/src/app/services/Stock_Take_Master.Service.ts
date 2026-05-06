import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { S3 } from 'aws-sdk';

@Injectable({
providedIn: 'root'
})
export class Stock_Take_Master_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Stock_Take_Master(Stock_Take_Master_)
{
    debugger
return this.http.post(environment.BasePath +'Stock_Take_Master/Save_Stock_Take_Master/',Stock_Take_Master_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_ItemCode_Typeahead(Item_Code): Observable<any> {
    debugger;
    return this.http.get(
      environment.BasePath +
        "Client_Accounts/Search_ItemCode_Typeahead/" +
        Item_Code
    );
  }
Search_Stock_Add_Master(From_Date,To_Date,look_In_Date_Value,Branch):Observable<any>
{
    debugger
 return this.http.get(environment.BasePath +'Stock_Add_Master/Search_Stock_Add_Master/'+From_Date+'/'+To_Date + '/'+look_In_Date_Value+ '/'+Branch);
}

Search_Stock_Take_Master(look_In_Date_Value,From_Date,To_Date,Stock_Take_Name_Id,Login_User_Id):Observable<any>
{
    debugger
 return this.http.get(environment.BasePath +'Stock_Take_Master/Search_Stock_Take_Master/'+look_In_Date_Value+'/'+From_Date+'/'+To_Date + '/'+Stock_Take_Name_Id+ '/'+Login_User_Id);
}

 Search_Item_Typeahead(Item_Name):Observable<any>
{
     var Search_Data = { 'Item_Name': Item_Name }
     return this.http.get(environment.BasePath + 'Item/Item_Typeahead/', { params: Search_Data });
 }
 Search_To_Stock_Typeahead(Client_Id,Item_Name):Observable<any>
{
    if(Item_Name==undefined)
    Item_Name="";
     return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);
}
Get_Barcode_Stock(Barcode):Observable<any>
{
    if(Barcode==undefined)
    Barcode="";
 return this.http.get(environment.BasePath +'Stock_Add_Master/Get_Barcode_Stock/'+Barcode);
}

Get_Item_Typeahead(ItemName):Observable<any>
{
    if(ItemName==undefined)
    ItemName="";
 return this.http.get(environment.BasePath +'Stock_Add_Master/Get_Item_Typeahead/'+ItemName);
}

Search_Stock_Add_Report(Look_In_Date,Search_FromDate,Search_ToDate, Item_Id):Observable<any>
{
     
 return this.http.get(environment.BasePath +'Stock_Add_Master/Search_Stock_Add_Report/'+Look_In_Date+'/'+Search_FromDate+'/'+Search_ToDate+'/'+Item_Id);
}

Delete_Stock_Take_Master(Stock_Take_Master_Id)
{
 return this.http.get(environment.BasePath +'Stock_Take_Master/Delete_Stock_Take_Master/'+Stock_Take_Master_Id);}

Get_Stock_Take_Details(Stock_Take_Master_Id):Observable<any>
{
 return this.http.get(environment.BasePath +'Stock_Take_Master/Get_Stock_Take_Details/'+Stock_Take_Master_Id);
}

/*** Added on 7-8-24 */

uploadFile(file){
	debugger;
	return new Promise((resolve, reject) => {
		const contentType = file.type;
		const currentDate = new Date();
const formattedDate = currentDate.toISOString().replace(/[-:.TZ]/g, "").replace("T", "");
console.log(formattedDate);
const key = `abhrami/${formattedDate}_${file.name}`;
  
		const bucket = new S3({
		  accessKeyId: environment.aws.accessKeyId,
		  secretAccessKey: environment.aws.secretAccessKey,
		  region: environment.aws.region,
		});
  
		const params = {
		  Bucket: environment.aws.bucket,
		  Key: key,
		  Body: file,
		  ACL: "public-read",
		  ContentType: contentType,
		};
  
		bucket.upload(params, function (err, data) {
		  if (err) {
			console.log("There was an error uploading your file: ", err);
			reject(err);
		  } else {
			console.log("Successfully uploaded file.", data);
			resolve(data);
		  }
		});
	  });
}

/*** Added on 23-08-2024 */

Search_Stock_Add_Master_Report(From_Date,To_Date,look_In_Date_Value,Branch):Observable<any>
{
 return this.http.get(environment.BasePath +'Stock_Add_Master/Search_Stock_Add_Master_Report/'+From_Date+'/'+To_Date + '/'+look_In_Date_Value+ '/'+Branch);

}

Get_Stock_Add_Details_Report(Stock_Add_Master_Id):Observable<any>
{
 return this.http.get(environment.BasePath +'Stock_Add_Details/Get_Stock_Add_Details_Report/'+Stock_Add_Master_Id);
}

/***  */

}


