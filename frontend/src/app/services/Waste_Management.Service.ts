import { Component, OnInit, Input, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.js";
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { AnimationKeyframesSequenceMetadata } from "@angular/animations";
import { S3 } from 'aws-sdk';
@Injectable({
	providedIn: "root",
})
export class Waste_Management_Service {
	constructor(private http: HttpClient) {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
			}),
		};
	}
	AnimationKeyframesSequenceMetadata;

	// Save_Waste_Management(Payment_Voucher_) {
	// 	return this.http.post(
	// 		environment.BasePath + "Payment_Voucher/Save_Waste_Management/",
	// 		Payment_Voucher_
	// 	);
	// }



	
	Save_Waste_Management(
    Waste_Management_,
    // Doc_Photo: File[],
    // ImageFile_Doc: File[],
    // Document_File_Array: any[]
) {
	const postData = {
						Waste_Management_Id: Waste_Management_.Waste_Management_Id,
				 		User_Id: Waste_Management_.User_Id,
    					Branch_Id: Waste_Management_.Branch_Id,
    					Branch_Name: Waste_Management_.Branch_Name,
    					Date: Waste_Management_.Date,
    					Description: Waste_Management_.Description,
    					Particular: Waste_Management_.Particular,
    					Item_Quantity: Waste_Management_.Item_Quantity,
    					Item_Id: Waste_Management_.Item_Id,
    					Item_Name: Waste_Management_.Item_Name,
						Doc_Photo: Waste_Management_.Doc_Photo,
						File_Path: Waste_Management_.filepath,
						Item_Code: Waste_Management_.Item_Code
					 };

				debugger;
    // const postData = new FormData();
    // postData.append("Waste_Management_Id", Waste_Management_.Waste_Management_Id);
    // postData.append("User_Id", Waste_Management_.User_Id);
    // postData.append("Doc_Photo", Waste_Management_.Doc_Photo);
    // postData.append("Branch_Id", Waste_Management_.Branch_Id);
    // postData.append("Branch_Name", Waste_Management_.Branch_Name);
    // postData.append("Date", Waste_Management_.Date);
    // postData.append("Description", Waste_Management_.Description);
    // // postData.append("Particular", Document_.Particular);
    // postData.append("Item_Quantity", Waste_Management_.Item_Quantity);
    // postData.append("Item_Id", Waste_Management_.Item_Id);
    // postData.append("Item_Name", Waste_Management_.Item_Name);
	
    // postData.append("Particular", Waste_Management_.Particular);
	
    // postData.append("Item_Code", Waste_Management_.Item_Code); 
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
        environment.BasePath + "Payment_Voucher/Save_Waste_Management",
        postData
    );
}
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	Search_Waste_Management(
		Search_FromDate,
		Search_ToDate,
		Branch_,
		Item_,
		look_In_Date_Value,Login_User
	): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Payment_Voucher/Search_Waste_Management/" +
				Search_FromDate +
				"/" +
				Search_ToDate +
				"/" +
				Branch_ +
				"/" +
				Item_ +
				"/" +
				look_In_Date_Value +
				"/" +
				Login_User
		);
	}

	Delete_Waste_Management(Waste_Management_Id_) {
		return this.http.get(
			environment.BasePath +
				"Payment_Voucher/Delete_Waste_Management/" +
				Waste_Management_Id_
		);
	}
	Search_Waste_Management_Report(
		Search_FromDate,
		Search_ToDate,
		Branch_,
		Item_,
		look_In_Date_Value
	): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Payment_Voucher/Search_Waste_Management_Report/" +
				Search_FromDate +
				"/" +
				Search_ToDate +
				"/" +
				Branch_ +
				"/" +
				Item_ +
				"/" +
				look_In_Date_Value
		);
	}
//Daily Report

	Search_Daily_Report(
		Search_FromDate,
		Search_ToDate,
		Branch_,
		Item_,
		look_In_Date_Value
	): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Payment_Voucher/Search_Daily_Report/" +
				Search_FromDate +
				"/" +
				Search_ToDate +
				"/" +
				Branch_ +
				"/" +
				Item_ +
				"/" +
				look_In_Date_Value
		);
	}
	/*** Added on 23-02-2024 */
Get_Item_Name_Get_With_Code_Waste_Management(Item_Code):Observable<any>
{
	debugger;
    return this.http.get(environment.BasePath +'Payment_Voucher/Get_Item_Name_Get_With_Code_Waste_Management/'+Item_Code);
}

/*** Added on 06-05-2024 ***/
uploadFile(file){
	debugger;
	return new Promise((resolve, reject) => {
		const contentType = file.type;
		const currentDate = new Date();
const formattedDate = currentDate.toISOString().replace(/[-:.TZ]/g, "").replace("T", "");
console.log(formattedDate);
const key = `abhrami/${formattedDate}_${file.name}`;
  
		const bucket = new S3({
		  accessKeyId: " AKIAX37YDYI4ACBOVVMU",
		  secretAccessKey: "PVGwH9UVVzRdLvHylXqjcF5IZilV1Z0dTQR2rpRb",
		  region: "us-east-2",
		});
  
		const params = {
		  Bucket: "ufsnabeelphotoalbum",
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

/*** Added on 18-07-2024 */

Search_Daybook(
	Search_FromDate,
	Search_ToDate,
	Branch_,
	Item_,
	look_In_Date_Value
): Observable<any> {
	return this.http.get(
		environment.BasePath +
			"Payment_Voucher/Search_Daybook/" +
			Search_FromDate +
			"/" +
			Search_ToDate +
			"/" +
			Branch_ +
			"/" +
			Item_ +
			"/" +
			look_In_Date_Value
	);
}

Delete_Daybook(Waste_Management_Id_) {
	return this.http.get(
		environment.BasePath +
			"Payment_Voucher/Delete_Daybook/" +
			Waste_Management_Id_
	);
}

Save_Daybook(
    Waste_Management_,
    // Doc_Photo: File[],
    // ImageFile_Doc: File[],
    // Document_File_Array: any[]
) {		

	const postData = {
						Daybook_Id: Waste_Management_.Daybook_Id,
				 		// User_Id: Waste_Management_.User_Id,
    					Client_Accounts_Id: Waste_Management_.Client_Accounts_Id,
    					Client_Accounts_Name: Waste_Management_.Client_Accounts_Name,
    					// Date: Waste_Management_.Date,
    					Remarks: Waste_Management_.Remarks,
    					// Particular: Waste_Management_.Particular,
    					Quantity: Waste_Management_.Quantity,
    					Item_Id: Waste_Management_.Item_Id,
    					Item_Name: Waste_Management_.Item_Name,
						Item_Group_Id: Waste_Management_.Item_Group_Id,
    					Item_Group_Name: Waste_Management_.Item_Group_Name,
						Master_Category_Id: Waste_Management_.Master_Category_Id,
    					Master_Category_Name: Waste_Management_.Master_Category_Name,
						Doc_Photo: Waste_Management_.Doc_Photo,
						File_Path: Waste_Management_.filepath,
						Item_Code: Waste_Management_.Item_Code,
						Amount: Waste_Management_.Amount
					 };

				debugger;
    // const postData = new FormData();
    // postData.append("Waste_Management_Id", Waste_Management_.Waste_Management_Id);
    // postData.append("User_Id", Waste_Management_.User_Id);
    // postData.append("Doc_Photo", Waste_Management_.Doc_Photo);
    // postData.append("Branch_Id", Waste_Management_.Branch_Id);
    // postData.append("Branch_Name", Waste_Management_.Branch_Name);
    // postData.append("Date", Waste_Management_.Date);
    // postData.append("Description", Waste_Management_.Description);
    // // postData.append("Particular", Document_.Particular);
    // postData.append("Item_Quantity", Waste_Management_.Item_Quantity);
    // postData.append("Item_Id", Waste_Management_.Item_Id);
    // postData.append("Item_Name", Waste_Management_.Item_Name);
	
    // postData.append("Particular", Waste_Management_.Particular);
	
    // postData.append("Item_Code", Waste_Management_.Item_Code); 
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
        environment.BasePath + "Payment_Voucher/Save_Daybook",
        postData
    );
}

/**** */


/*** Added on 23-08-2024 */


Search_Daybook_Report(
	Search_FromDate,
	Search_ToDate,
	Branch_,
	look_In_Date_Value
): Observable<any> {
	return this.http.get(
		environment.BasePath +
			"Payment_Voucher/Search_Daybook_Report/" +
			Search_FromDate +
			"/" +
			Search_ToDate +
			"/" +
			Branch_ +
			"/" +
			look_In_Date_Value
	);
}


Search_Waste_Management_Report_1(
	Search_FromDate,
	Search_ToDate,
	Branch_,
	look_In_Date_Value
): Observable<any> {
	return this.http.get(
		environment.BasePath +
			"Payment_Voucher/Search_Waste_Management_Report_1/" +
			Search_FromDate +
			"/" +
			Search_ToDate +
			"/" +
			Branch_ +
			"/" +
			look_In_Date_Value
	);
}

/*** */}
