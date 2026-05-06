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
import { S3 } from "aws-sdk";
@Injectable({
	providedIn: "root",
})
export class Petty_Cash_Service {
	constructor(private http: HttpClient) {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
			}),
		};
	}
	AnimationKeyframesSequenceMetadata;

	Save_Petty_Cash(
		Petty_Cash_,
		// Doc_Photo: File[],
		// ImageFile_Doc: File[],
		// Document_File_Array: any[],
		// Payment_Data_Details_:any[],
		// Receipt_Data_Details_:any[]
	) {
		// console.log(Petty_Cash_.Particular);
		const postData = 
		{
		   Petty_Cash_Id: Petty_Cash_.Petty_Cash_Id,
		   Date: Petty_Cash_.Date,
		   Particular: Petty_Cash_.Particular,
		   Branch_Id: Petty_Cash_.Branch_Id,
		   Branch_Name: Petty_Cash_.Branch_Name,
		   Type_Id: Petty_Cash_.Type_Id,
		   Type_Name: Petty_Cash_.Type_Name,
		   Document_Name: Petty_Cash_.Document_Name,
		   SumTotal: Petty_Cash_.SumTotal,
		   RecpTotal: Petty_Cash_.RecpTotal,
		   User_Id: Petty_Cash_.User_Id,
		   Pos_Amount: Petty_Cash_.Pos_Amount,
		   Closing_Balnce: Petty_Cash_.Closing_Balnce,
		   Closing_Cash: Petty_Cash_.Closing_Cash,
		   Closing_coin: Petty_Cash_.Closing_coin,
		   Payment_Data: JSON.stringify(Petty_Cash_.Payment_Data_Details_),
		   Receipt_Data: JSON.stringify(Petty_Cash_.Receipt_Data_Details_),
		   File_Path: Petty_Cash_.filepath,
		   Opening_Balance: Petty_Cash_.Opening_Balance,
		   Profit_Loss: Petty_Cash_.Profit_Loss
		};
   
   debugger;
		// const postData = new FormData();
		// const particular1 = String(Petty_Cash_.Particular);
		// postData.append("Petty_Cash_Id", Petty_Cash_.Petty_Cash_Id);
		// postData.append("Date", Petty_Cash_.Date);
		// postData.append("Particular", Petty_Cash_.Particular);
		// postData.append("Branch_Id", Petty_Cash_.Branch_Id);
		// postData.append("Branch_Name", Petty_Cash_.Branch_Name);
		// postData.append("Account_Id", Petty_Cash_.Account_Id);
		// postData.append("Account_Name", Petty_Cash_.Account_Name);
		// postData.append("Type_Id", Petty_Cash_.Type_Id);
		// postData.append("Type_Name", Petty_Cash_.Type_Name);
		// postData.append("Particular", Petty_Cash_.Particular);
		// postData.append("Amount", Petty_Cash_.Amount);
		// postData.append("Document_Name", Petty_Cash_.Document_Name);

		// postData.append("Expense", Petty_Cash_.Expense);
		// postData.append("Ho", Petty_Cash_.Ho);
		// postData.append("Salary", Petty_Cash_.Salary);
		// postData.append("Management", Petty_Cash_.Management);
		// postData.append("SumTotal", Petty_Cash_.SumTotal);
		// postData.append("Cash", Petty_Cash_.Cash);
		// postData.append("Upi", Petty_Cash_.Upi);
		// postData.append("Card", Petty_Cash_.Card);
		// postData.append("Coin", Petty_Cash_.Coin);
		// postData.append("Bank", Petty_Cash_.Bank);
		// postData.append("RecpTotal", Petty_Cash_.RecpTotal);
		// postData.append("ExpenseRemark", Petty_Cash_.ExpenseRemark);
		// postData.append("HoRemark", Petty_Cash_.HoRemark);
		// postData.append("SalaryRemark", Petty_Cash_.SalaryRemark);
		// postData.append("ManagementRemark", Petty_Cash_.ManagementRemark);
		 
		// postData.append("User_Id", Petty_Cash_.User_Id);
		// postData.append("Pos_Amount", Petty_Cash_.Pos_Amount);


		// postData.append("Closing_Balnce", Petty_Cash_.Closing_Balnce);
		// postData.append("Closing_Cash", Petty_Cash_.Closing_Cash);
		// postData.append("Closing_coin", Petty_Cash_.Closing_coin);

		// postData.append("Payment_Data", JSON.stringify(Petty_Cash_.Payment_Data_Details_)  );
 
		// postData.append("Receipt_Data", JSON.stringify(Petty_Cash_.Receipt_Data_Details_)  );

		var i = 0;

		// if (ImageFile_Doc != undefined) {
		// 	for (const img of ImageFile_Doc) {
		// 		postData.append("myFile", img);
		// 		postData.append("ImageFile_Doc", i.toString());
		// 		i = i + 1;
		// 	}
		// }

		// postData.append("Document_File_Array", i.toString());
		// if (Document_File_Array != undefined) {
		// 	var j = 0;
		// 	for (const img of Document_File_Array) {
		// 		if (Document_File_Array[j].New_Entry == 1) {
		// 			postData.append("myFile", img);
		// 		}
		// 		j++;
		// 		i = i + 1;
		// 	}
		// }
	
		// console.log(postData);
		debugger;
		return this.http.post(
			environment.BasePath + "Payment_Voucher/Save_Petty_Cash",
			postData
		);
	}


	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	Search_Petty_Cash(
		Search_FromDate,
		Search_ToDate,
		Branch_,
		Type_,
		look_In_Date_Value,Login_User_
	): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Payment_Voucher/Search_Petty_Cash/" +
				Search_FromDate +
				"/" +
				Search_ToDate +
				"/" +
				Branch_ +
				"/" +
				Type_ +
				"/" +
				look_In_Date_Value +
				"/" +
				Login_User_
		);
	}

	Delete_Petty_Cash(Petty_Cash_Id_) {
		debugger
		return this.http.get(
			environment.BasePath +
				"Payment_Voucher/Delete_Petty_Cash/" +
				Petty_Cash_Id_
		);
	}
	Search_Petty_Cash_Report(
		Search_FromDate,
		Search_ToDate,
		Branch_,
		Type_,
		look_In_Date_Value
	): Observable<any> {
		debugger
		return this.http.get(
			environment.BasePath +
				"Payment_Voucher/Search_Petty_Cash_Report/" +
				Search_FromDate +
				"/" +
				Search_ToDate +
				"/" +
				Branch_ +
				"/" +
				Type_ +
				"/" +
				look_In_Date_Value
		);
	}


	 

	Get_Petty_Cash_details(Petty_Cash_Id) {
        return this.http.get(environment.BasePath + 'Payment_Voucher/Get_Petty_Cash_details/' + Petty_Cash_Id);
    }

	/*** Added on 08-05-2024 ***/

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

	/*** Added on 10-05-2024 ***/

	Get_Opening_Balance(Branch_Id,Date) {
		debugger;
        return this.http.get(environment.BasePath + 'Payment_Voucher/Get_Opening_Balance/' + Branch_Id + '/' + Date);
    }

   /** Added on 22-08-2024 */

   Search_Petty_Cash_Report_1(
	Search_FromDate,
	Search_ToDate,
	Branch_,
	look_In_Date_Value
): Observable<any> {
	return this.http.get(
		environment.BasePath +
			"Payment_Voucher/Search_Petty_Cash_Report_1/" +
			Search_FromDate +
			"/" +
			Search_ToDate +
			"/" +
			Branch_ +
			"/" +
			look_In_Date_Value 
	);
}

Get_Petty_Cash_Details_Report(Petty_Cash_Id) 
{
	return this.http.get(environment.BasePath + 'Payment_Voucher/Get_Petty_Cash_Details_Report/' + Petty_Cash_Id);
}
}
