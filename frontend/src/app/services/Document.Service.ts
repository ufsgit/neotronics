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
export class Document_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
// Save_Document(Document_ )
// {
//     debugger
// return this.http.post(environment.BasePath +'Document/Save_Document/',Document_);}


Save_Document(
    Document_,
    // Doc_Photo: File[],
    // ImageFile_Doc: File[],
    // Document_File_Array: any[]
) {
    // debugger;
    const postData = 
     {
        Document_Id: Document_.Document_Id,
        Period_From: Document_.Period_From,
        Period_To: Document_.Period_To,
        Branch_Id: Document_.Branch_Id,
        Branch_Name: Document_.Branch_Name,
        Document_Type_Id: Document_.Document_Type_Id,
        Document_Type_Name: Document_.Document_Type_Name,
        Document_Description: Document_.Document_Description,
        Document_Name: Document_.Document_Name,
        Item_Name: Document_.Item_Name,
        Doc_Photo: Document_.Doc_Photo,
        File_Path: Document_.filepath
     };

debugger;
    // const postData = new FormData();
    // postData.append("Document_Id", Document_.Document_Id);
    // postData.append("Period_From", Document_.Period_From);
    // postData.append("Period_To", Document_.Period_To);
    // postData.append("Branch_Id", Document_.Branch_Id);
    // postData.append("Branch_Name", Document_.Branch_Name);
    // postData.append("Document_Type_Id", Document_.Document_Type_Id);
    // postData.append("Document_Type_Name", Document_.Document_Type_Name);
    // // postData.append("Particular", Document_.Particular);
    // postData.append("Document_Description", Document_.Document_Description);
    // postData.append("Document_Name", Document_.Document_Name);
    // postData.append("Doc_Photo", Document_.Doc_Photo);
    // var i = 0;

    // if (ImageFile_Doc != undefined) {
    //     for (const img of ImageFile_Doc) {
    //         postData.append("myFile", img);
    //         postData.append("ImageFile_Doc", i.toString());
    //         i = i + 1;
    //     }
    // }

    // postData.append("Document_File_Array", i.toString());
    // if (Document_File_Array != undefined) {
    //     var j = 0;
    //     for (const img of Document_File_Array) {
    //         if (Document_File_Array[j].New_Entry == 1) {
    //             postData.append("myFile", img);
    //         }
    //         j++;
    //         i = i + 1;
    //     }
    // }
    return this.http.post(
        environment.BasePath + "Document/Save_Document",
        postData
    );
}
private extractData(res: Response)
{
let body = res;
return body || { };
}

Load_Document(): Observable<any> {
         

    return this.http.get(environment.BasePath + 'Document/Load_Document/');
}


// Search_Document(Document_Name):Observable<any>
// {
//  return this.http.get(environment.BasePath +'Document/Search_Document/'+Document_Name);}


Search_Document(
    Search_FromDate,
    Search_ToDate,
 
    Type,
    look_In_Date_Value,
    Branch_
): Observable<any> {
    debugger
    return this.http.get(
        environment.BasePath +
            "Document/Search_Document/" +
            Search_FromDate +
            "/" +
            Search_ToDate +
         
            "/" +
            Type +
            "/" +
            look_In_Date_Value +
            "/" + 
            Branch_
    );
}




// Delete_Document(Document_Id)
// {
//     debugger
//  return this.http.get(environment.BasePath +'Document/Delete_Document/'+Document_Id);}


Delete_Document(Document_Id) {
    debugger
    return this.http.get(
        environment.BasePath +
            "Document/Delete_Document/" +
            Document_Id
    );
}
Get_Document(Document_Id)
{
     
 return this.http.get(environment.BasePath +'Document/Get_Document/'+Document_Id);}

 Get_Document_Dropdowns()
{
	return this.http.get(environment.BasePath +'Document/Get_Document_Dropdowns/');
	}


/*** Added on 07-05-2024 ***/

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

}
 
